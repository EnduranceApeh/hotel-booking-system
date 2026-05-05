import { prisma } from "@/lib/prisma";
import { DollarSign, BedDouble, CalendarDays, Users } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Luxe Hotel",
};

export default async function AdminDashboard() {
  const [totalRooms, totalBookings, totalGuests, revenue] = await Promise.all([
    prisma.room.count(),
    prisma.booking.count(),
    prisma.guest.count(),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" }
    })
  ]);

  const totalRevenue = revenue._sum.amount ? Number(revenue._sum.amount) : 0;

  const stats = [
    { name: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
    { name: "Total Bookings", value: totalBookings, icon: CalendarDays },
    { name: "Total Rooms", value: totalRooms, icon: BedDouble },
    { name: "Total Guests", value: totalGuests, icon: Users },
  ];

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { guest: true, room: true },
  });

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <div className="p-2 bg-gray-50 rounded-lg">
                <stat.icon className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">Recent Bookings</h2>
        </div>
        
        {recentBookings.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Guest</th>
                <th className="px-6 py-4 font-medium">Room</th>
                <th className="px-6 py-4 font-medium">Dates</th>
                <th className="px-6 py-4 font-medium" align="right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{b.guest.firstName} {b.guest.lastName}</p>
                    <p className="text-gray-500 text-xs">{b.guest.email}</p>
                  </td>
                  <td className="px-6 py-4">{b.room.name}</td>
                  <td className="px-6 py-4">
                    {new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900" align="right">
                    ${Number(b.totalPrice).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No recent bookings found.
          </div>
        )}
      </div>
    </div>
  );
}
