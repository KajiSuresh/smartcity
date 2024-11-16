'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SearchBar = () => {
  const [date, setDate] = useState<Date>();
  const [activeButton, setActiveButton] = useState('Hotels');

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-red-500 to-red-400 h-[250px] w-full absolute top-0 left-0" />
      
      <div className="container mx-auto px-4 relative pt-16">
        <div className="flex gap-4 mb-6">
          {[
            { icon: '🏨', label: 'Hotels' },
            { icon: '✈️', label: 'Flights' },
            { icon: '🚗', label: 'Car Rentals' },
            { icon: '🎡', label: 'Attractions' },
            { icon: '🚕', label: 'Airport Taxis' },
          ].map(({ icon, label }) => (
            <Button
              key={label}
              variant="outline"
              className={`
                bg-white hover:bg-gray-50 transition-all duration-200
                ${activeButton === label
                  ? 'border-blue-500 border-2 text-blue-600 shadow-md scale-105' 
                  : 'border-gray-200 text-gray-600 hover:border-blue-300'}
                flex items-center gap-2 px-6 py-3 rounded-full
              `}
              onClick={() => setActiveButton(label)}
            >
              <span className="text-xl">{icon}</span>
              <span className="font-medium">{label}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal p-3 hover:border-blue-300 transition-colors duration-200",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="rounded-lg border shadow-lg"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1">
            <Select>
              <SelectTrigger className="p-3 hover:border-blue-300 transition-colors duration-200">
                <SelectValue placeholder="2 adults · 0 children · 1 room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-0-1">2 adults · 0 children · 1 room</SelectItem>
                <SelectItem value="2-1-1">2 adults · 1 child · 1 room</SelectItem>
                <SelectItem value="2-2-1">2 adults · 2 children · 1 room</SelectItem>
                <SelectItem value="3-0-1">3 adults · 0 children · 1 room</SelectItem>
                <SelectItem value="4-0-2">4 adults · 0 children · 2 rooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-gradient-to-r from-red-500 to-red-400 hover:bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 