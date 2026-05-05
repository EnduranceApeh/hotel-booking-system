"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "top-0 z-50 w-full transition-all duration-300 ease-in-out border-b",
        isHomePage ? "fixed" : "sticky",
        isHomePage && !isScrolled 
          ? "bg-transparent border-transparent" 
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(
              "font-heading text-2xl font-bold uppercase tracking-widest transition-colors duration-300",
              isHomePage && !isScrolled ? "text-white" : "text-primary"
            )}>
              LUXE
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {[
              { name: 'Rooms & Suites', href: '/rooms' },
              { name: 'Amenities', href: '/amenities' },
              { name: 'Gallery', href: '/gallery' },
              { name: 'About Us', href: '/about' },
            ].map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isHomePage && !isScrolled 
                    ? "text-white/90 hover:text-white" 
                    : "text-muted-foreground hover:text-primary",
                  pathname === link.href && !isHomePage ? "text-primary" : ""
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            href="/contact" 
            className={cn(
              "hidden sm:inline-flex text-sm font-medium transition-colors duration-300",
              isHomePage && !isScrolled ? "text-white/90 hover:text-white" : "text-muted-foreground hover:text-primary"
            )}
          >
            Contact
          </Link>
          <Button 
            asChild 
            variant={isHomePage && !isScrolled ? "secondary" : "default"}
            className={cn(
              "rounded-full tracking-wider font-semibold px-6 transition-all duration-300",
              isHomePage && !isScrolled ? "bg-white text-black hover:bg-white/90" : ""
            )}
          >
            <Link href="/rooms">BOOK NOW</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
