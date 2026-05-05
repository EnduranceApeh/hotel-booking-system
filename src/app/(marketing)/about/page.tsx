import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Leaf, Heart } from "lucide-react";

export const metadata = {
  title: "About Us | Luxe Hotel & Resort",
  description: "Discover the rich history and commitment to excellence that defines Luxe Hotel & Resort.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Elegant Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2500&auto=format&fit=crop"
            alt="Luxe Hotel Architecture"
            fill
            className="object-cover animate-[pulse_20s_ease-in-out_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-white">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Our <span className="font-serif italic font-light">Story</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-white/90 font-light">
              A legacy of timeless elegance and uncompromising luxury.
            </p>
          </div>
        </div>
      </section>

      {/* The Heritage / Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-bl-[100px] rounded-tr-[100px] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop"
                alt="Heritage detail"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Since 1985</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 leading-tight text-foreground">
                A Vision of <br/> <span className="font-serif italic text-muted-foreground">Perfect Hospitality</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                <p>
                  Founded on the principle that true luxury is defined by the details, Luxe Hotel & Resort has been a sanctuary for discerning travelers for nearly four decades. What began as a passionate vision to redefine hospitality has grown into a landmark of elegance.
                </p>
                <p>
                  Every element of our resort, from the meticulously landscaped gardens to the bespoke furnishings in each suite, is designed to evoke a sense of profound tranquility and inspiration. We believe that a stay with us is not just a vacation, but a carefully curated experience that lingers in your memory long after you&apos;ve returned home.
                </p>
                <p>
                  Our commitment remains unchanged: to provide an environment where your needs are anticipated, your expectations are exceeded, and your comfort is absolute.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-heading text-4xl font-bold text-primary">300+</span>
                  <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Luxury Suites</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-heading text-4xl font-bold text-primary">15+</span>
                  <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Global Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values / Pillars of Excellence */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Pillars of <span className="font-serif italic font-light">Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              The core principles that guide our every action and shape your experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: "Uncompromising Quality",
                description: "From the thread count of our linens to the ingredients in our kitchens, we accept nothing but the finest the world has to offer."
              },
              {
                icon: <Heart className="h-8 w-8 text-primary" />,
                title: "Personalized Service",
                description: "Our dedicated staff is trained to anticipate your needs, ensuring a bespoke experience tailored precisely to your preferences."
              },
              {
                icon: <Leaf className="h-8 w-8 text-primary" />,
                title: "Sustainable Luxury",
                description: "We are deeply committed to protecting our beautiful surroundings, integrating sustainable practices without ever compromising on comfort."
              }
            ].map((value, i) => (
              <div key={i} className="bg-background p-10 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 group">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-4 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Team (Optional but builds trust) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Meet The <span className="font-serif italic font-light">Artisans</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                The passionate individuals who work tirelessly behind the scenes to orchestrate your perfect stay.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
                name: "Arthur Pendelton",
                role: "General Manager"
              },
              {
                image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
                name: "Elena Rostova",
                role: "Executive Chef"
              },
              {
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
                name: "David Chen",
                role: "Head Concierge"
              }
            ].map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium tracking-wide uppercase text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop"
              alt="Luxury room"
              fill
              className="object-cover opacity-20"
            />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8 text-white">
            Ready to experience the <span className="font-serif italic font-light text-white/90">extraordinary?</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 font-light">
            Join us at Luxe Hotel & Resort and discover a world where luxury knows no bounds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-6 text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-2xl">
              <Link href="/rooms">Reserve Your Stay</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none px-10 py-6 text-sm font-semibold tracking-widest uppercase transition-all duration-300 bg-transparent">
              <Link href="/contact">Contact Concierge</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
