import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, MapPin, MailCheck } from 'lucide-react';

export const metadata = {
  title: 'Booking Confirmed | Luxe Hotel & Resort',
};

export default function BookingSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const reference = searchParams.ref as string;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-background">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-2xl w-full bg-card shadow-2xl border border-border/60 rounded-3xl p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
        
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for choosing Luxe Hotel & Resort. Your reservation has been securely processed.
        </p>

        {reference && (
          <div className="bg-muted/50 rounded-2xl p-6 mb-10 border border-primary/20 inline-block">
            <span className="block text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-2">Booking Reference</span>
            <span className="font-mono text-3xl font-bold text-primary tracking-wider">{reference}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
           <div className="bg-background rounded-xl p-5 border border-border/50 flex items-start gap-4 shadow-sm">
             <MailCheck className="w-6 h-6 text-primary flex-shrink-0" />
             <div>
               <h4 className="font-bold text-sm">Confirmation Email</h4>
               <p className="text-sm text-muted-foreground mt-1">We&apos;ve sent a detailed itinerary to your email address.</p>
             </div>
           </div>
           
           <div className="bg-background rounded-xl p-5 border border-border/50 flex items-start gap-4 shadow-sm">
             <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
             <div>
               <h4 className="font-bold text-sm">Getting Here</h4>
               <p className="text-sm text-muted-foreground mt-1">123 Coastal Breeze Way, Paradise City. <Link href="/contact" className="text-primary hover:underline">View Map</Link></p>
             </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-border/50 pt-10">
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-12 px-8">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button size="lg" asChild className="w-full sm:w-auto h-12 px-8">
            <Link href="/rooms">Book Another Room</Link>
          </Button>
        </div>
        
      </div>
    </div>
  );
}
