import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Coffee, Dumbbell, Wine, Waves, Wifi, Car, Utensils, Scissors, MonitorPlay, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Luxury Amenities | Luxe Hotel & Resort',
  description: 'Discover the world-class amenities at Luxe Hotel & Resort, including our infinity pool, fine dining, spa, and fitness center.',
};

const AMENITIES = [
  {
    title: 'Infinity Pool & Cabanas',
    description: 'Relax by our temperature-controlled infinity pool overlooking the ocean. Private cabanas are available by reservation.',
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800',
  },
  {
    title: 'Serenity Spa',
    description: 'Rejuvenate your body and mind with our holistic treatments, hot stone massages, and eucalyptus steam rooms.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800',
  },
  {
    title: 'Fine Dining Restaurant',
    description: 'Experience culinary excellence at our Michelin-starred restaurant, featuring seasonal, locally sourced ingredients.',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800',
  },
  {
    title: 'State-of-the-art Fitness Center',
    description: 'Maintain your routine in our 24/7 fitness center equipped with the latest cardio and strength training equipment.',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
  },
];

const COMPLIMENTARY = [
  { text: 'High-Speed Wi-Fi', icon: Wifi },
  { text: 'Valet Parking', icon: Car },
  { text: 'In-Room Coffee', icon: Coffee },
  { text: 'Smart TV & Streaming', icon: MonitorPlay },
  { text: 'Evening Turndown', icon: Wine },
  { text: 'Premium Toiletries', icon: Scissors },
];

export default function AmenitiesPage() {
  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2500&auto=format&fit=crop"
            alt="Amenities Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">Amenities & Services</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-light">
              Elevate your stay with our curated selection of luxury amenities and personalized services designed for your comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Main Amenities */}
      <section className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {AMENITIES.map((amenity, idx) => (
            <div key={idx} className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  <amenity.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">{amenity.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complimentary Services */}
      <section className="mt-24 pt-24 pb-16 bg-card text-card-foreground border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12">Complimentary with Every Stay</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {COMPLIMENTARY.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mb-2 shadow-sm">
                  <item.icon className="w-7 h-7" />
                </div>
                <span className="font-medium text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-20">
            <Button size="lg" asChild className="px-10 rounded-md">
              <Link href="/rooms">Book Your Experience</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
