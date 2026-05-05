"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Clock, AlertCircle } from 'lucide-react';

interface ClientBookingFlowProps {
  roomId: string;
  orderSummary: {
    roomName: string;
    roomImage: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    adults: number;
    children: number;
    basePrice: number;
    totalRoomPrice: number;
    serviceFee: number;
    taxes: number;
    totalAmount: number;
  };
}

export default function ClientBookingFlow({ roomId, orderSummary }: ClientBookingFlowProps) {
  const router = useRouter();
  const [sessionToken] = useState(() => crypto.randomUUID());
  
  const [lockStatus, setLockStatus] = useState<'acquiring' | 'locked' | 'failed' | 'expired'>('acquiring');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  // Acquire Lock on Mount
  useEffect(() => {
    async function acquireLock() {
      try {
        const res = await fetch('/api/booking/lock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId,
            sessionToken,
            checkIn: orderSummary.checkIn,
            checkOut: orderSummary.checkOut,
          }),
        });

        const data = await res.json();
        
        if (res.ok && data.data?.expiresInSeconds) {
          setLockStatus('locked');
          setTimeLeft(data.data.expiresInSeconds);
        } else {
          setLockStatus('failed');
          setErrorMsg(data.error || 'Currently unavailable for these dates.');
        }
      } catch {
        setLockStatus('failed');
        setErrorMsg('Network error while establishing reservation session.');
      }
    }

    acquireLock();

    // Release lock if unmounted early (optional safety net)
    return () => {
      // Browsers may cancel this, but it's a best effort to unlock.
      fetch('/api/booking/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, sessionToken }),
        keepalive: true,
      }).catch(() => {});
    };
  }, [roomId, sessionToken, orderSummary]);

  // Timer Tick
  useEffect(() => {
    if (lockStatus !== 'locked' || timeLeft === null) return;

    if (timeLeft <= 0) {
      setLockStatus('expired');
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lockStatus, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePaymentSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
       setErrorMsg('Please fill in all required guest details.');
       return;
    }
    
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          sessionToken,
          checkIn: orderSummary.checkIn,
          checkOut: orderSummary.checkOut,
          adults: orderSummary.adults,
          children: orderSummary.children,
          guestInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Success redirect
        router.push(`/book/success?ref=${data.data.confirmationNumber}`);
      } else {
        setErrorMsg(data.error || 'Failed to complete booking. Please try again.');
        setIsSubmitting(false);
      }
    } catch {
      setErrorMsg('A network error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Format Time Left: MM:SS
  const formattedTimeLeft = timeLeft 
    ? `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}` 
    : '00:00';

  if (lockStatus === 'acquiring') {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h3 className="text-xl font-bold">Securing your room...</h3>
        <p className="text-muted-foreground">Please wait while we confirm availability.</p>
      </div>
    );
  }

  if (lockStatus === 'failed') {
    return (
      <div className="py-24 text-center space-y-6 max-w-lg mx-auto">
        <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
        <h2 className="text-2xl font-bold">Room Unavailable</h2>
        <p className="text-muted-foreground">{errorMsg}</p>
        <Button onClick={() => router.push('/rooms')}>Return to Rooms</Button>
      </div>
    );
  }

  if (lockStatus === 'expired') {
    return (
      <div className="py-24 text-center space-y-6 max-w-lg mx-auto">
        <Clock className="w-16 h-16 text-muted-foreground mx-auto" />
        <h2 className="text-2xl font-bold">Session Expired</h2>
        <p className="text-muted-foreground">Your reservation session has expired. To attempt booking again, please return to the selection page.</p>
        <Button onClick={() => router.back()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Form */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-8">
        
        {errorMsg && (
          <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-xl flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium text-sm">{errorMsg}</p>
          </div>
        )}

        <div className="bg-card shadow-sm border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="font-bold">1</span>
            </div>
            <h2 className="text-xl font-bold">Guest Details</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name <span className="text-destructive">*</span></label>
              <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name <span className="text-destructive">*</span></label>
              <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
              <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
              <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" required />
            </div>
            <div className="sm:col-span-2 space-y-2 mt-2">
              <label className="text-sm font-medium">Special Requests (Optional)</label>
              <textarea 
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]" 
                placeholder="Let us know if you have any special requirements..."
              />
            </div>
          </div>
        </div>

        <div className="bg-card shadow-sm border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="font-bold">2</span>
            </div>
            <h2 className="text-xl font-bold">Payment Setup</h2>
          </div>
          
          <div className="bg-muted p-4 rounded-lg flex items-start gap-4 mb-6">
            <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Secure Payment Verification</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your booking is secured immediately upon confirmation. A simulated payment will be processed to confirm your reservation.
              </p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full text-lg h-14" 
            onClick={handlePaymentSubmit}
            disabled={isSubmitting || lockStatus !== 'locked'}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </div>

      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 mt-8 lg:mt-0">
        <div className="bg-card shadow-sm border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all">
          {/* TRL Timer / Header */}
          <div className={`p-4 flex items-center justify-center gap-2 border-b border-border transition-colors duration-500 ${timeLeft && timeLeft < 300 ? 'bg-destructive text-destructive-foreground' : 'bg-primary/10 text-primary'}`}>
            <Clock className="w-5 h-5" />
            <span className="font-bold text-sm">Room held for {formattedTimeLeft}</span>
          </div>
          
          {/* Room Summary Image */}
          <div className="relative h-48 w-full">
            <Image
              src={orderSummary.roomImage}
              alt={orderSummary.roomName}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-6">
            <h3 className="font-heading text-xl font-bold mb-1">{orderSummary.roomName}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {orderSummary.adults + orderSummary.children} Guests • 1 Room
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Check-in</span>
                <span className="font-semibold">{format(parseISO(orderSummary.checkIn), 'EEE, MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Check-out</span>
                <span className="font-semibold">{format(parseISO(orderSummary.checkOut), 'EEE, MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-4 border-t border-border">
                <span className="text-muted-foreground">Length of stay</span>
                <span className="font-semibold">{orderSummary.nights} Night{orderSummary.nights > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">${orderSummary.basePrice.toFixed(2)} x {orderSummary.nights} night{orderSummary.nights > 1 ? 's' : ''}</span>
                <span>${orderSummary.totalRoomPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Fee (10%)</span>
                <span>${orderSummary.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes & VAT (7.5%)</span>
                <span>${orderSummary.taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border mt-2">
                <span className="font-bold">Total Payable</span>
                <span className="font-bold text-2xl text-primary">${orderSummary.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-bold text-sm mb-2">Cancellation Policy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Free cancellation up to 72 hours before check-in. Non-refundable within 72 hours of arrival.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
