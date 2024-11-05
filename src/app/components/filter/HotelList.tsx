'use client';

import React, { useState } from 'react';
import { List, Grid, SlidersHorizontal } from 'lucide-react';
import HotelCard from './HotelCard';
import Filters from './Filters';
export const SAMPLE_HOTELS = [
    {
      id: '1',
      name: "Simpson's Forest - Luxury Boutique Resort & Spa",
      image: '/img/f1.jpg',
      location: '8.7 km from centre',
      rating: 8.8,
      reviews: 63,
      price: 810,
      features: ['Forest Villa', 'Mountain View', 'Spa Access', 'Free WiFi'],
      dealBadge: 'Limited-time Deal'
    },
    {
      id: '1',
      name: "Simpson's Forest - Luxury Boutique Resort & Spa",
      image: '/img/f2.jpg',
      location: '8.7 km from centre',
      rating: 8.8,
      reviews: 63,
      price: 810,
      features: ['Forest Villa', 'Mountain View', 'Spa Access', 'Free WiFi'],
      dealBadge: 'Limited-time Deal'
    },
   
    {
      id: '1',
      name: "Simpson's Forest - Luxury Boutique Resort & Spa",
      image: '/img/f3.jpg',
      location: '8.7 km from centre',
      rating: 8.8,
      reviews: 63,
      price: 810,
      features: ['Forest Villa', 'Mountain View', 'Spa Access', 'Free WiFi'],
      dealBadge: 'Limited-time Deal'
    },
   
    {
      id: '1',
      name: "Simpson's Forest - Luxury Boutique Resort & Spa",
      image: '/img/f4.jpg',
      location: '8.7 km from centre',
      rating: 8.8,
      reviews: 63,
      price: 810,
      features: ['Forest Villa', 'Mountain View', 'Spa Access', 'Free WiFi'],
      dealBadge: 'Limited-time Deal'
    },
   
   
  ];

const HotelList = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">589 properties found</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-blue-600"
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>
          <div className="flex gap-2 border rounded-md">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <Grid size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {showFilters && (
          <aside className="w-80 flex-shrink-0">
            <Filters />
          </aside>
        )}
        
        <div className={`flex-1 grid ${viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {SAMPLE_HOTELS.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} viewMode={viewMode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelList;