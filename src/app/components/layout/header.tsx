'use client';

import { Search, Menu, CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { useState } from 'react';
import Link from 'next/link';


export default function Navbar() {
//   const [location, setLocation] = useState('Anywhere');
//   const [dates, setDates] = useState('Any Week');
//   const [guests, setGuests] = useState('Add Guests');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-[2520px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 md:gap-0 h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              
              <span className="hidden md:block text-[#FF385C] font-bold text-xl ml-2">SmartCity</span>
            </Link>
          </div>

          {/* Search Bar */}
          {/* <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer">
              <button className="font-medium px-4 border-r">iuhhjhnj</button>
              <button className="font-medium px-4 border-r">jkbkjbj</button>
              <button className="font-medium px-4">jbkjbkjb</button>
              <div className="bg-[#FF385C] p-2 rounded-full text-white">
                <Search className="h-4 w-4" />
              </div>
            </div>
          </div> */}

          {/* Right Section */}
          <div className="flex items-center gap-4">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full border-gray-300 shadow-sm px-2 py-5 flex items-center gap-3">
                  <Menu className="h-4 w-4" />
                  <CircleUserRound className="h-8 w-8 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>Sign up</DropdownMenuItem>
                <DropdownMenuItem>Log in</DropdownMenuItem>
                <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Search Button */}
      <div className="md:hidden flex items-center justify-center p-4 border-t">
        <button className="flex items-center gap-2 border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition w-full">
          <Search className="h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="font-medium">Anywhere</span>
            <span className="text-sm text-gray-500">Any week · Add guests</span>
          </div>
        </button>
      </div>
    </nav>
  );
}