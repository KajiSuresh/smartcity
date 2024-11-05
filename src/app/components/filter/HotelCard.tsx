'use client';

import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface HotelCardProps {
  hotel: {
    image: string;
    name: string;
    dealBadge?: string;
    rating: number;
    reviews: number;
    location: string;
    features: string[];
  };
  viewMode: 'grid' | 'list';
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, viewMode }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${
      viewMode === 'list' ? 'flex' : 'block'
    }`}>
      <div className={`relative ${viewMode === 'list' ? 'w-80' : 'w-full'}`}>
        <div className="relative w-full h-48">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover"
          />
        </div>
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
        {hotel.dealBadge && (
          <span className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            {hotel.dealBadge}
          </span>
        )}
      </div>
      
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">{hotel.rating}</span>
            <span className="text-gray-500">({hotel.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{hotel.location}</span>
        </div>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {hotel.features.map((feature, index) => (
              <span
                key={index}
                className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-2xl font-bold text-gray-900">$810</p>
            <p className="text-sm text-gray-500">per night</p>
          </div>
          <Link 
            href={`/single_page?id=$`} 
            className="bg-gradient-to-r from-red-500 to-red-500 text-white px-6 py-2 rounded-md  inline-block"
          >
            View Deal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;