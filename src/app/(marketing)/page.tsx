import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Users, MapPin } from 'lucide-react'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { QuickBookWidget } from '@/components/QuickBookWidget';

export const metadata = {
  title: 'Luxe Hotel & Resort | Experience Luxury',
  description: 'Book your stay at Luxe Hotel & Resort directly for the best rates. Experience unparalleled luxury, breathtaking views, and world-class amenities.',
};

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] w-full flex items-center pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2500&auto=format&fit=crop"
            alt="Luxury resort view"
            fill
            className="object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
            priority
          />
          {/* Elegant gradient overlay for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full min-h-[calc(100svh-8rem)]">
          <div className="max-w-3xl mt-auto mb-16 md:mb-24">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">5-Star Luxury Resort</span>
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
                Experience <br />
                <span className="font-serif italic font-light text-white/90">Unrivaled Luxury</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
              Your perfect stay starts here. Immerse yourself in breathtaking views, world-class amenities, and uncompromising comfort.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                <Link href="/rooms">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black h-14 px-8 text-sm font-bold tracking-widest uppercase transition-all duration-300 bg-black/10 backdrop-blur-sm">
                <Link href="/gallery">Explore Resort</Link>
              </Button>
            </div>
          </div>
          
          {/* Quick Book Widget */}
          <div className="w-full max-w-5xl mt-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both">
            <QuickBookWidget />
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Our Accommodations</h2>
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Rest & Rejuvenate</h3>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link href="/rooms">View All Rooms</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Link href="/rooms" key={i} className="group relative block rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[3/4]">
                <Image
                  src={i === 1 ? "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800" : i === 2 ? "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800" : "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800"}
                  alt={`Luxury Room ${i}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="flex justify-between items-end mb-2">
                    <h4 className="font-heading text-2xl font-bold">{i === 1 ? 'Ocean View Suite' : i === 2 ? 'Premium Deluxe' : 'Private Villa'}</h4>
                    <span className="text-lg font-medium text-primary-foreground">From $299</span>
                  </div>
                  <p className="text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-w-[90%]">
                    Spacious and elegant with panoramic views and premium amenities.
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Button variant="outline" size="lg" asChild className="w-full">
              <Link href="/rooms">View All Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Facilities / Amenities Preview */}
      <section className="py-24 bg-card text-card-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200"
                alt="Resort Pool"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Experience More</h2>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-6">World-Class Amenities</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether you&apos;re looking to relax by our infinity pool, dine at our Michelin-starred restaurant, or rejuvenate at the spa, every detail is designed for your comfort and pleasure.
              </p>
              <ul className="space-y-4 mb-10">
                {['Award-winning Spa & Wellness Center', 'Rooftop Infinity Pool & Bar', '24/7 Concierge & Room Service', 'Private Beach Access'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" variant="default" asChild>
                <Link href="/amenities">Discover Amenities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
