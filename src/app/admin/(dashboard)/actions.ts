"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleRoomStatus(roomId: string, currentStatus: boolean) {
  try {
    await prisma.room.update({
      where: { id: roomId },
      data: { isActive: !currentStatus },
    });
    revalidatePath("/admin/rooms");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update room status." };
  }
}

export async function cancelBooking(bookingId: string) {
  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to cancel booking." };
  }
}
