'use client';

import { Menu, CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoginDialog from '@/app/(publicpage)/login/page';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-[2520px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 md:gap-0 h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className={`md:block font-bold text-xl ml-2 ${
                  isScrolled ? 'text-[#FF385C]' : 'text-white'
                }`}>
                  SmartCity
                </span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`rounded-full shadow-sm px-2 py-5 flex items-center gap-3 ${
                      isScrolled 
                        ? 'border-gray-300 bg-white' 
                        : 'border-white/30 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <Menu className={`h-4 w-4 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
                    <CircleUserRound className={`h-8 w-8 ${isScrolled ? 'text-gray-500' : 'text-white'}`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onSelect={() => setIsLoginOpen(true)}>Sign up</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsLoginOpen(true)}>Log in</DropdownMenuItem>
                  <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
                  <DropdownMenuItem>Help Center</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <LoginDialog 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}