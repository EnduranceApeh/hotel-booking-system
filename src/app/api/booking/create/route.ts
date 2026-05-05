import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { differenceInDays, parseISO, isValid } from 'date-fns';

function generateConfirmationNumber() {
  return `LX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      roomId, 
      sessionToken, 
      checkIn, 
      checkOut, 
      adults, 
      children,
      guestInfo,
      specialRequests 
    } = body;

    // Basic Validation
    if (!roomId || !sessionToken || !checkIn || !checkOut || !guestInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone } = guestInfo;
    if (!firstName || !lastName || !email || !phone) {
       return NextResponse.json(
         { error: 'Incomplete guest information' },
         { status: 400 }
       );
    }

    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);

    if (!isValid(checkInDate) || !isValid(checkOutDate) || checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Invalid dates provided in request' },
        { status: 400 }
      );
    }

    // 1. Verify Active Lock
    const activeLock = await prisma.reservationLock.findFirst({
      where: {
        roomId,
        sessionToken,
        expiresAt: { gt: new Date() },
        bookingId: null,
      },
    });

    if (!activeLock) {
      return NextResponse.json(
        { error: 'Reservation session expired or invalid. Please search for availability again.' },
        { status: 400 }
      );
    }

    // 2. Execute Transaction
    const bookingResult = await prisma.$transaction(async (tx) => {
      // Find Room
      const room = await tx.room.findUnique({
        where: { id: roomId },
      });

      if (!room) throw new Error('Room not found');

      // Calculate Basics
      const nights = differenceInDays(checkOutDate, checkInDate);
      const totalRoomPrice = Number(room.basePrice) * nights;
      
      const serviceFee = totalRoomPrice * 0.10;
      const taxes = totalRoomPrice * 0.075;
      const totalAmount = totalRoomPrice + serviceFee + taxes;

      // Find Default Cancellation Policy
      const policy = await tx.cancellationPolicy.findFirst({
        where: { isDefault: true },
      });

      let cancellationPolicyId = policy?.id;
      // Fallback if no policy seeded
      if (!cancellationPolicyId) {
        const newPolicy = await tx.cancellationPolicy.create({
           data: {
             name: 'Standard Policy',
             isDefault: true,
             rules: { freeCancellationWithinHours: 72 }
           }
        });
        cancellationPolicyId = newPolicy.id;
      }

      // Guest handling: Upsert Guest by email
      let guest = await tx.guest.findFirst({
        where: { email },
      });

      if (!guest) {
        guest = await tx.guest.create({
          data: { firstName, lastName, email, phone },
        });
      }

      // Create Booking
      const confirmationNumber = generateConfirmationNumber();
      const booking = await tx.booking.create({
        data: {
          confirmationNumber,
          roomId,
          guestId: guest.id,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults: Number(adults) || 2,
          children: Number(children) || 0,
          totalPrice: totalAmount,
          status: 'PENDING',
          cancellationPolicyId: cancellationPolicyId,
          specialRequests,
        },
      });

      // Create Payment Record (Pending)
      const payment = await tx.payment.create({
        data: {
          bookingId: booking.id,
          gateway: 'PAYSTACK', // Example Integration
          amount: totalAmount,
          currency: 'USD',
          status: 'PENDING',
        },
      });

      // Update Lock to be attached to this booking
      await tx.reservationLock.update({
        where: { id: activeLock.id },
        data: { bookingId: booking.id },
      });

      return { booking, payment, guest };
    });

    return NextResponse.json({
      data: {
        confirmationNumber: bookingResult.booking.confirmationNumber,
        bookingId: bookingResult.booking.id,
        totalAmount: Number(bookingResult.booking.totalPrice),
      },
      message: 'Booking created successfully',
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error while creating booking' },
      { status: 500 }
    );
  }
}
