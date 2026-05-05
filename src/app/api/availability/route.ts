import { NextRequest, NextResponse } from 'next/server';
import { calculateAvailability } from '@/lib/services/availability.service';
import { isValid, parseISO } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    const roomId = searchParams.get('roomId') || undefined;

    if (!checkInParam || !checkOutParam) {
      return NextResponse.json(
        { error: 'checkIn and checkOut query parameters are required' },
        { status: 400 }
      );
    }

    const checkInDate = parseISO(checkInParam);
    const checkOutDate = parseISO(checkOutParam);

    if (!isValid(checkInDate) || !isValid(checkOutDate)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use ISO 8601 strings (e.g. 2026-12-24)' },
        { status: 400 }
      );
    }

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'checkOut must be after checkIn' },
        { status: 400 }
      );
    }

    const availability = await calculateAvailability(checkInDate, checkOutDate, roomId);

    return NextResponse.json({ data: availability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Internal server error while calculating availability' },
      { status: 500 }
    );
  }
}
