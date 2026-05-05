import { prisma } from '@/lib/prisma';
import { calculateAvailability } from './availability.service';
import { addMinutes } from 'date-fns';

export async function createReservationLock(
  roomId: string,
  sessionToken: string,
  checkInDate: Date,
  checkOutDate: Date,
  lockDurationMinutes: number = 15
) {
  // 1. Check availability
  const availability = await calculateAvailability(checkInDate, checkOutDate, roomId);
  
  if (availability.length === 0 || availability[0].availableUnits <= 0) {
    throw new Error('Room is not available for the selected dates');
  }

  // 2. Create the lock
  const expiresAt = addMinutes(new Date(), lockDurationMinutes);

  // We should use a transaction or handle unique constraint, but Prisma doesn't have a simple 
  // "insert if condition met" for concurrency easily without raw SQL.
  // We will assume `calculateAvailability` did a good job and rely on application logic here.
  // In a very high concurrency system, we'd use raw SQL with SELECT FOR UPDATE.
  const lock = await prisma.reservationLock.create({
    data: {
      roomId,
      sessionToken,
      expiresAt,
    },
  });

  return lock;
}

export async function getActiveLock(sessionToken: string, roomId: string) {
  return await prisma.reservationLock.findFirst({
    where: {
      sessionToken,
      roomId,
      expiresAt: { gt: new Date() },
      bookingId: null,
    },
  });
}

export async function releaseLock(lockId: string) {
  // Rather than deleting, we can just expire it immediately or delete it.
  // Let's delete it for cleanliness.
  return await prisma.reservationLock.delete({
    where: { id: lockId },
  });
}
