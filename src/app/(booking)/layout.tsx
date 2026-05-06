import Link from 'next/link';

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-xl font-bold uppercase tracking-widest text-primary">LUXE</span>
          </Link>
          <div className="text-sm font-medium text-muted-foreground">
            Secure Booking
          </div>
        </div>
      </header>
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {children}
        </div>
      </main>
      <footer className="py-6 border-t bg-background mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Need help? Call us at +1 (800) 123-LUXE</p>
          <p className="mt-2 text-xs">Payment is processed securely. We use industry-standard encryption to protect your personal details.</p>
        </div>
      </footer>
    </div>
  );
}