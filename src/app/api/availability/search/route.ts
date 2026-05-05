import { NextRequest, NextResponse } from 'next/server';
import { calculateAvailability } from '@/lib/services/availability.service';
import { isValid, parseISO } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const checkInStr = searchParams.get('checkIn');
    const checkOutStr = searchParams.get('checkOut');
    const roomId = searchParams.get('roomId') || undefined;

    if (!checkInStr || !checkOutStr) {
      return NextResponse.json({ error: 'Missing checkIn or checkOut dates' }, { status: 400 });
    }

    const checkIn = parseISO(checkInStr);
    const checkOut = parseISO(checkOutStr);

    if (!isValid(checkIn) || !isValid(checkOut)) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    if (checkIn >= checkOut) {
      return NextResponse.json({ error: 'Check-in must be before check-out' }, { status: 400 });
    }

    const availability = await calculateAvailability(checkIn, checkOut, roomId);

    return NextResponse.json({ data: availability });
  } catch (error) {
    console.error('Availability API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
