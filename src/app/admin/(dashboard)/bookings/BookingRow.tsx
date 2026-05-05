"use client";

import { useState } from "react";
import { cancelBooking } from "../actions";

interface BookingRowProps {
  booking: {
    id: string;
    confirmationNumber: string;
    status: string;
    checkIn: Date;
    checkOut: Date;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    totalPrice: any;
    guest: {
      firstName: string;
      lastName: string;
      email: string;
    };
    room: {
      name: string;
    };
  };
}

export function BookingRow({ booking }: BookingRowProps) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setLoading(true);
      await cancelBooking(booking.id);
      setLoading(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 font-mono text-xs text-gray-600">{booking.confirmationNumber}</td>
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">{booking.guest.firstName} {booking.guest.lastName}</p>
        <p className="text-gray-500 text-xs">{booking.guest.email}</p>
      </td>
      <td className="px-6 py-4 text-gray-600">{booking.room.name}</td>
      <td className="px-6 py-4 text-gray-600">
        <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
        <p className="text-gray-400 text-xs">to {new Date(booking.checkOut).toLocaleDateString()}</p>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900">
        ${Number(booking.totalPrice).toLocaleString()}
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
          ${booking.status === "CONFIRMED" ? "bg-green-50 text-green-700 border-green-200" : ""}
          ${booking.status === "PENDING" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}
          ${booking.status === "CANCELLED" ? "bg-gray-100 text-gray-700 border-gray-200" : ""}
          ${booking.status === "FAILED" ? "bg-red-50 text-red-700 border-red-200" : ""}
        `}>
          {booking.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right space-x-3">
        {booking.status !== "CANCELLED" && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            {loading ? "..." : "Cancel"}
          </button>
        )}
      </td>
    </tr>
  );
}
