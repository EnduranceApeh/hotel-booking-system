import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateAvailability } from '@/lib/services/availability.service';
import { addMinutes, parseISO, isValid } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId, sessionToken, checkIn, checkOut } = body;

    if (!roomId || !sessionToken || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'roomId, sessionToken, checkIn, and checkOut are required' },
        { status: 400 }
      );
    }

    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);

    if (!isValid(checkInDate) || !isValid(checkOutDate)) {
      return NextResponse.json(
        { error: 'Invalid dates provided in request' },
        { status: 400 }
      );
    }

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'checkOut must be after checkIn' },
        { status: 400 }
      );
    }

    // 1. Verify availability BEFORE creating lock
    const availabilityResult = await calculateAvailability(checkInDate, checkOutDate, roomId);
    
    if (availabilityResult.length === 0) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    const roomAvailability = availabilityResult[0];

    if (roomAvailability.availableUnits <= 0) {
      return NextResponse.json(
        { error: 'Room is no longer available for the selected dates' },
        { status: 409 } // Conflict
      );
    }

    // 2. Create the Lock using an upsert to handle case where user is retrying 
    // or replacing their own previous lock for the same room.
    const lockDurationMinutes = 15;
    const expiresAt = addMinutes(new Date(), lockDurationMinutes);

    // Provide atomic lock creation by leveraging Prisma's transactional nature
    // Check if conflicting locks exist for this user? The @unique is on [roomId, sessionToken]
    const lock = await prisma.reservationLock.upsert({
      where: {
        roomId_sessionToken: {
          roomId,
          sessionToken,
        },
      },
      update: {
        expiresAt,
      },
      create: {
        roomId,
        sessionToken,
        expiresAt,
      },
    });

    return NextResponse.json({
      data: {
        lock,
        expiresInSeconds: lockDurationMinutes * 60,
      },
      message: 'Room lock acquired successfully',
    });

  } catch (error) {
    console.error('Error locking room:', error);
    return NextResponse.json(
      { error: 'Internal server error while locking room' },
      { status: 500 }
    );
  }
}
