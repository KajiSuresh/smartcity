import SearchFilters from '@/components/search/SearchFilters';
import { Card } from '@/components/ui/card';
import React from 'react'
const popularDestinations = [
    {
      title: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
      description: "The City of Light awaits"
    },
    {
      title: "Tokyo",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      description: "Experience modern Japan"
    },
    {
      title: "New York",
      image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&q=80",
      description: "The city that never sleeps"
    }
  ];
  
export default function Landing () {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
            alt="Travel Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
            Discover Your Next Destination
          </h1>
          <SearchFilters />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularDestinations.map((destination) => (
            <Card key={destination.title} className="overflow-hidden group cursor-pointer">
              <div className="relative h-64">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{destination.title}</h3>
                  <p className="text-sm opacity-90">{destination.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
      )
} 

