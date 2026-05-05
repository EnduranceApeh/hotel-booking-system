import { prisma } from '@/lib/prisma';
import { differenceInDays, parseISO, isValid } from 'date-fns';
import ClientBookingFlow from './ClientBookingFlow';

export const metadata = {
  title: 'Complete Your Booking | Luxe Hotel',
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const roomId = searchParams.roomId as string;
  const checkIn = searchParams.checkIn as string;
  const checkOut = searchParams.checkOut as string;
  const adults = parseInt(searchParams.adults as string) || 2;
  const children = parseInt(searchParams.children as string) || 0;

  if (!roomId || !checkIn || !checkOut) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold">Missing Information</h2>
        <p className="text-muted-foreground">Please select dates and a room to proceed with your booking.</p>
      </div>
    );
  }

  const checkInDate = parseISO(checkIn);
  const checkOutDate = parseISO(checkOut);

  if (!isValid(checkInDate) || !isValid(checkOutDate)) {
     return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold">Invalid Dates</h2>
        <p className="text-muted-foreground">The selected dates are invalid.</p>
      </div>
    );
  }

  let room = null;
  try {
    room = await prisma.room.findUnique({
      where: { id: roomId }
    });
  } catch (error) {
    console.error("Failed to load room details:", error);
  }

  if (!room) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold">Room Not Found</h2>
        <p className="text-muted-foreground">We couldn&apos;t find the room you selected. It may have been removed or the database is unavailable.</p>
      </div>
    );
  }

  const nights = differenceInDays(checkOutDate, checkInDate);
  const totalRoomPrice = Number(room.basePrice) * nights;
  const serviceFee = totalRoomPrice * 0.10;
  const taxes = totalRoomPrice * 0.075;
  const totalAmount = totalRoomPrice + serviceFee + taxes;

  const orderSummary = {
    roomName: room.name,
    roomImage: room.images?.[0] || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600",
    checkIn: checkIn,
    checkOut: checkOut,
    nights,
    adults,
    children,
    basePrice: Number(room.basePrice),
    totalRoomPrice,
    serviceFee,
    taxes,
    totalAmount
  };

  return (
    <ClientBookingFlow 
      roomId={room.id}
      orderSummary={orderSummary} 
    />
  );
}
