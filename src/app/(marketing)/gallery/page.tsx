import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Photo Gallery | Luxe Hotel & Resort',
  description: 'View photos of our luxury hotel, stunning rooms, breathtaking views, and world-class facilities.',
};

const IMAGES = [
  { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200', title: 'Hotel Exterior at Twilight', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800', title: 'Ocean View Suite' },
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800', title: 'Premium Deluxe Bed' },
  { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800', title: 'Infinity Pool' },
  { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800', title: 'Serenity Spa' },
  { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200', title: 'Fine Dining Restaurant', colSpan: 'md:col-span-2' },
  { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800', title: 'Executive Suite Lounge' },
  { url: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=800', title: 'Hotel Lobby' },
];

export default function GalleryPage() {
  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2500&auto=format&fit=crop"
            alt="Gallery Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">Gallery</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-light">
              Take a visual journey through Luxe Hotel & Resort and picture yourself here.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-xl overflow-hidden group ${img.colSpan || ''} ${img.rowSpan || ''}`}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <span className="text-white font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-lg text-muted-foreground mb-8">Ready to experience it for yourself?</p>
          <Button size="lg" className="px-12 rounded-md" asChild>
            <Link href="/rooms">Book Your Stay</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
