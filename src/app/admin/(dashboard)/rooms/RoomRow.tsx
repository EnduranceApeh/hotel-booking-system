"use client";

import { useState } from "react";
import { toggleRoomStatus } from "../actions";

interface RoomRowProps {
  room: {
    id: string;
    name: string;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    basePrice: any;
    maxAdults: number;
    maxChildren: number;
    isActive: boolean;
  };
}

export function RoomRow({ room }: RoomRowProps) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await toggleRoomStatus(room.id, room.isActive);
    setLoading(false);
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-900">{room.name}</td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
          {room.type}
        </span>
      </td>
      <td className="px-6 py-4">${Number(room.basePrice).toLocaleString()} / night</td>
      <td className="px-6 py-4 text-gray-500">
        {room.maxAdults} Adults, {room.maxChildren} Children
      </td>
      <td className="px-6 py-4">
        {room.isActive ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
            Inactive
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-right space-x-3">
        <button
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </button>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`text-sm font-medium ${room.isActive ? "text-amber-600 hover:text-amber-800" : "text-green-600 hover:text-green-800"} disabled:opacity-50`}
        >
          {loading ? "..." : room.isActive ? "Disable" : "Enable"}
        </button>
      </td>
    </tr>
  );
}
