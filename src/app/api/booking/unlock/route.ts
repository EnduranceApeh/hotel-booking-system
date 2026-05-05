import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId, sessionToken } = body;

    if (!roomId || !sessionToken) {
      return NextResponse.json(
        { error: 'roomId and sessionToken are required' },
        { status: 400 }
      );
    }

    // Attempt to delete the lock early
    try {
      await prisma.reservationLock.delete({
        where: {
          roomId_sessionToken: {
            roomId,
            sessionToken,
          },
        },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // Prisma throws P2025 if the record to delete does not exist
      if (e.code === 'P2025') {
        return NextResponse.json(
          { message: 'Lock already released or did not exist' },
          { status: 200 }
        );
      }
      throw e;
    }

    return NextResponse.json({
      message: 'Room lock successfully released early',
    });

  } catch (error) {
    console.error('Error unlocking room:', error);
    return NextResponse.json(
      { error: 'Internal server error while releasing room lock' },
      { status: 500 }
    );
  }
}
