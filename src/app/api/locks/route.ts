import { NextRequest, NextResponse } from 'next/server';
import { createReservationLock, releaseLock } from '@/lib/services/lock.service';
import { parseISO, isValid } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId, sessionToken, checkIn, checkOut } = body;

    if (!roomId || !sessionToken || !checkIn || !checkOut) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);

    if (!isValid(checkInDate) || !isValid(checkOutDate)) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const lock = await createReservationLock(roomId, sessionToken, checkInDate, checkOutDate);

    return NextResponse.json({ data: lock }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Create Lock API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lockId = searchParams.get('lockId');

    if (!lockId) {
      return NextResponse.json({ error: 'Missing lockId' }, { status: 400 });
    }

    await releaseLock(lockId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Lock API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
