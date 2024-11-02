'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MapPin, Check } from "lucide-react";
import { useState } from "react";

const popularDestinations = [
  { value: 'paris', label: 'Paris, France' },
  { value: 'tokyo', label: 'Tokyo, Japan' },
  { value: 'nyc', label: 'New York City, USA' },
  { value: 'london', label: 'London, UK' },
  { value: 'rome', label: 'Rome, Italy' },
];

export default function PlaceSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <MapPin className="mr-2 h-4 w-4" />
          {value ? popularDestinations.find((dest) => dest.value === value)?.label : 'Select destination'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search destination..." />
          <CommandEmpty>No destination found.</CommandEmpty>
          <CommandGroup heading="Popular Destinations">
            {popularDestinations.map((dest) => (
              <CommandItem
                key={dest.value}
                value={dest.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${value === dest.value ? "opacity-100" : "opacity-0"}`}
                />
                {dest.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}