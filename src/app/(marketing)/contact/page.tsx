import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Luxe Hotel & Resort",
  description: "Get in touch with the Luxe Hotel & Resort concierge for inquiries, reservations, and special requests.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Elegant Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/heroImage.jpg"
            alt="Luxe Hotel Concierge"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-white">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              Contact <span className="font-serif italic font-light">Us</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-white/90 font-light">
              We are at your service. Reach out to our concierge team for any assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Contact Information */}
            <div className="flex flex-col">
              <div className="mb-10">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Get in <span className="font-serif italic text-muted-foreground">Touch</span>
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  Whether you have a question about our suites, dining experiences, or wish to plan a special event, our dedicated team is here to assist you with unparalleled service.
                </p>
              </div>

              <div className="space-y-8 mt-4">
                {[
                  {
                    icon: <MapPin className="h-6 w-6 text-primary" />,
                    title: "Address",
                    details: ["123 Luxury Avenue, Coastal District", "Beverly Hills, CA 90210", "United States"]
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-primary" />,
                    title: "Telephone",
                    details: ["+1 (310) 555-0199", "Toll Free: 1-800-LUXE-STAY"]
                  },
                  {
                    icon: <Mail className="h-6 w-6 text-primary" />,
                    title: "Email",
                    details: ["concierge@luxehotelresort.com", "reservations@luxehotelresort.com"]
                  },
                  {
                    icon: <Clock className="h-6 w-6 text-primary" />,
                    title: "Business Hours",
                    details: ["Concierge Desk: 24/7", "Reservations: 8:00 AM - 10:00 PM (PST)"]
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                      {item.details.map((detail, dIdx) => (
                        <p key={dIdx} className="text-muted-foreground font-light">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-card p-8 md:p-10 rounded-2xl shadow-xl border border-border/50 flex flex-col justify-center">
              <h3 className="font-heading text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-semibold text-foreground">First Name</label>
                    <Input id="firstName" placeholder="John" className="h-12 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-semibold text-foreground">Last Name</label>
                    <Input id="lastName" placeholder="Doe" className="h-12 bg-background/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="h-12 bg-background/50" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-foreground">Subject</label>
                  <Input id="subject" placeholder="Inquiry about reservations" className="h-12 bg-background/50" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground">Message</label>
                  <textarea 
                    id="message" 
                    placeholder="How can we help you today?" 
                    rows={5}
                    className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold tracking-widest uppercase transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative Map / Location Section */}
      <section className="h-[400px] w-full bg-muted relative overflow-hidden">
        {/* Placeholder for an actual map embed, currently using a decorative stylized approach */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center border border-border/50 max-w-sm">
             <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
             <h3 className="font-heading text-2xl font-bold mb-2">Our Location</h3>
             <p className="text-muted-foreground font-light mb-4">123 Luxury Avenue<br/>Beverly Hills, CA 90210</p>
             <Button variant="outline" className="tracking-widest uppercase text-xs font-bold">Get Directions</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
