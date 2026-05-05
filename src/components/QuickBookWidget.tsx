"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function QuickBookWidget() {
  const router = useRouter();

  // State
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (date?.from) {
      params.set("checkIn", format(date.from, "yyyy-MM-dd"));
    }
    if (date?.to) {
      params.set("checkOut", format(date.to, "yyyy-MM-dd"));
    }
    params.set("adults", adults.toString());
    params.set("children", children.toString());

    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <div className="bg-background rounded-2xl md:rounded-[2rem] p-3 md:p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center w-full max-w-5xl border border-border/50">
      <div className="flex flex-col md:flex-row w-full flex-1 md:divide-x divide-border/50">
        
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex w-full md:w-2/3 flex-col md:flex-row focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl md:rounded-none group"
            >
              <div className="w-full flex-1 flex flex-col text-left px-4 py-3 md:py-2 transition-colors hover:bg-muted/50 rounded-xl md:rounded-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  Check In
                </span>
                <div className="flex items-center text-foreground font-medium">
                  <CalendarIcon className="h-4 w-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className={cn("truncate", !date?.from && "text-muted-foreground font-normal")}>
                    {date?.from ? format(date.from, "MMM dd, yyyy") : "Add dates"}
                  </span>
                </div>
              </div>
              
              <div className="hidden md:block w-px bg-border/50 h-full mx-2" />
              
              <div className="w-full flex-1 flex flex-col text-left px-4 py-3 md:py-2 transition-colors hover:bg-muted/50 rounded-xl md:rounded-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  Check Out
                </span>
                <div className="flex items-center text-foreground font-medium">
                  <CalendarIcon className="h-4 w-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className={cn("truncate", !date?.to && "text-muted-foreground font-normal")}>
                    {date?.to ? format(date.to, "MMM dd, yyyy") : "Add dates"}
                  </span>
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Guests Picker */}
        <div className="w-full md:w-1/3">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="w-full h-full flex flex-col text-left px-4 py-3 md:py-2 transition-colors hover:bg-muted/50 rounded-xl md:rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  Guests
                </span>
                <div className="flex items-center text-foreground font-medium">
                  <Users className="h-4 w-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="truncate">
                    {adults} Adults{children > 0 ? `, ${children} Children` : ''}
                  </span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4" align="end">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Adults</h4>
                    <p className="text-xs text-muted-foreground">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-muted-foreground/30"
                      onClick={() => setAdults((p) => Math.max(1, p - 1))}
                      disabled={adults <= 1}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center font-medium">{adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-muted-foreground/30"
                      onClick={() => setAdults((p) => Math.min(10, p + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Children</h4>
                    <p className="text-xs text-muted-foreground">Ages 0 to 12</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-muted-foreground/30"
                      onClick={() => setChildren((p) => Math.max(0, p - 1))}
                      disabled={children <= 0}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center font-medium">{children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-muted-foreground/30"
                      onClick={() => setChildren((p) => Math.min(10, p + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full md:w-auto h-14 md:h-16 px-8 mt-4 md:mt-0 md:ml-4 rounded-xl md:rounded-[1.5rem] bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-widest uppercase text-sm shadow-lg transition-transform active:scale-95"
        onClick={handleSearch}
        disabled={!date?.from || !date?.to}
      >
        Check Availability
      </Button>
    </div>
  );
}
