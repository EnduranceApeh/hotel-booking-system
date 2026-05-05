import { prisma } from '@/lib/prisma';
import { addDays } from 'date-fns';

export interface AvailabilityResult {
  roomId: string;
  name: string;
  type: string;
  basePrice: number;
  totalUnits: number;
  availableUnits: number;
}

export async function calculateAvailability(
  checkInDate: Date,
  checkOutDate: Date,
  roomId?: string
): Promise<AvailabilityResult[]> {
  // Find rooms
  const rooms = await prisma.room.findMany({
    where: {
      isActive: true,
      ...(roomId ? { id: roomId } : {}),
    },
  });

  const results: AvailabilityResult[] = [];

  for (const room of rooms) {
    // 1. Find overlapping Bookings (Not CANCELLED or FAILED)
    const bookings = await prisma.booking.findMany({
      where: {
        roomId: room.id,
        status: {
          notIn: ['CANCELLED', 'FAILED'],
        },
        OR: [
          {
            checkIn: { lt: checkOutDate },
            checkOut: { gt: checkInDate },
          },
        ],
      },
    });

    // 2. Find overlapping ReservationLocks
    const locks = await prisma.reservationLock.findMany({
      where: {
        roomId: room.id,
        expiresAt: { gt: new Date() },
        bookingId: null, // Only active locks that haven't been converted to a booking
      },
    });

    // 3. Find overlapping AvailabilityBlocks (Admin maintenance/holds)
    const blocks = await prisma.availabilityBlock.findMany({
      where: {
        roomId: room.id,
        OR: [
          {
            startDate: { lt: checkOutDate },
            endDate: { gt: checkInDate },
          },
        ],
      },
    });

    // Aggregate overlaps per day to find the maximum concurrent usage
    // A simple way is to check each day in the date range
    let maxConcurrentUsage = 0;
    let currentDate = new Date(checkInDate);
    
    while (currentDate < checkOutDate) {
      const nextDate = addDays(currentDate, 1);
      
      let currentDayUsage = 0;
      
      // Check bookings
      for (const booking of bookings) {
        if (booking.checkIn < nextDate && booking.checkOut > currentDate) {
          currentDayUsage++;
        }
      }

      // Check locks (locks don't have explicit check-in/out in schema currently, 
      // but they effectively hold 1 unit for the duration of the booking setup)
      // Since ReservationLock doesn't store the requested dates, we assume any active lock for this room
      // reduces availability by 1 for the dates checked. If requested dates were stored, it would be more precise.
      currentDayUsage += locks.length; 

      // Check blocks
      for (const block of blocks) {
        if (block.startDate < nextDate && block.endDate > currentDate) {
          currentDayUsage++;
        }
      }

      if (currentDayUsage > maxConcurrentUsage) {
        maxConcurrentUsage = currentDayUsage;
      }

      currentDate = nextDate;
    }

    results.push({
      roomId: room.id,
      name: room.name,
      type: room.type,
      basePrice: Number(room.basePrice),
      totalUnits: room.totalUnits,
      availableUnits: Math.max(0, room.totalUnits - maxConcurrentUsage),
    });
  }

  return results;
}
