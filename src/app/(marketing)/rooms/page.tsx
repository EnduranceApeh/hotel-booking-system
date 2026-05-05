import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { calculateAvailability } from '@/lib/services/availability.service';
import { prisma } from '@/lib/prisma';
import { parseISO, isValid } from 'date-fns';

export const metadata = {
  title: 'Our Rooms & Suites | Luxe Hotel & Resort',
  description: 'Explore our luxury rooms and suites. Find the perfect accommodation for your stay.',
};

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const checkInParam = searchParams.checkIn as string | undefined;
  const checkOutParam = searchParams.checkOut as string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rooms: any[] = [];
  let isDateSearch = false;

  try {
    if (checkInParam && checkOutParam) {
      const checkInDate = parseISO(checkInParam);
      const checkOutDate = parseISO(checkOutParam);

      if (isValid(checkInDate) && isValid(checkOutDate) && checkInDate < checkOutDate) {
        isDateSearch = true;
        // Uses the service we built to get exact available units
        const availabilityResults = await calculateAvailability(checkInDate, checkOutDate);
        
        // Fetch full room data and merge with availability results
        const allRooms = await prisma.room.findMany({ where: { isActive: true } });
        
        rooms = allRooms.map(room => {
          const avail = availabilityResults.find(a => a.roomId === room.id);
          return {
            ...room,
            availableUnits: avail ? avail.availableUnits : room.totalUnits,
          };
        }).filter(r => r.availableUnits > 0); // Only show rooms with availability
      }
    }

    if (!isDateSearch) {
      rooms = await prisma.room.findMany({ where: { isActive: true } });
    }
  } catch (error) {
    console.error("Failed to load rooms:", error);
    // Fallback or error state could go here
  }

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2500&auto=format&fit=crop"
            alt="Rooms Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">Rooms & Suites</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-light">
              {isDateSearch 
                ? `Showing available accommodations from ${checkInParam} to ${checkOutParam}.`
                : `Discover our collection of thoughtfully designed accommodations, where every detail is tailored to provide an exceptional stay.`}
            </p>
          </div>
        </div>
      </section>

      {/* Room Listing */}
      <section className="container mx-auto px-4 mt-16">
        {rooms.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <h3 className="text-2xl font-bold text-foreground">No Rooms Available</h3>
            <p className="text-muted-foreground">
              We couldn&apos;t find any rooms matching your current dates. Please try selecting different dates.
            </p>
            <Button asChild className="mt-4"><Link href="/">Go Back</Link></Button>
          </div>
        ) : (
          <div className="space-y-16">
            {rooms.map((room, idx) => (
              <div key={room.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src={room.images?.[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200'}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {isDateSearch && room.availableUnits <= 2 && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      Only {room.availableUnits} left!
                    </div>
                  )}
                </div>
                
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">{room.type}</h2>
                      <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{room.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm text-muted-foreground">From</span>
                      <span className="text-3xl font-bold text-primary">${Number(room.basePrice)}</span>
                      <span className="text-sm text-muted-foreground"> / night</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {room.description}
                  </p>
                  
                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Up to {room.maxAdults + room.maxChildren} Guests</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-semibold text-sm mb-3">Room Highlights</h4>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {(room.amenities || []).map((amenity: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-6">
                    <Button size="lg" className="w-full sm:w-auto px-10 rounded-md" asChild>
                      <Link href={`/book?roomId=${room.id}${isDateSearch ? `&checkIn=${checkInParam}&checkOut=${checkOutParam}&adults=${searchParams.adults || 2}&children=${searchParams.children || 0}` : ''}`}>
                        Select Room
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
