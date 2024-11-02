import React from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent, } from '@/components/ui/card';

const PropertyCard = ({ property }) => (
  <Card className="overflow-hidden group">
    <div className="relative">
      <img
        src={property.imageUrl}
        alt={property.name}
        className="w-full h-48 object-cover"
      />
      <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors">
        <Heart className="w-5 h-5 text-gray-600" />
      </button>
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg">{property.name}</h3>
      <p className="text-gray-600 text-sm">{property.location}</p>
      <div className="flex items-center mt-2 gap-2">
        <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm">
          {property.rating}
        </span>
        <span className="text-sm font-medium">
          {property.ratingText} · {property.reviews} reviews
        </span>
      </div>
    </CardContent>
  </Card>
);

const Offers = () => {
  const properties = [
    {
      id: 1,
      name: "Seaside Villa",
      location: "Coastal Town, Country",
      rating: "8.5",
      ratingText: "Excellent",
      reviews: 24,
      imageUrl: "/img/f1.jpg"
    },
    {
      id: 2,
      name: "Mountain Lodge",
      location: "Highland Valley, Country",
      rating: "7.8",
      ratingText: "Very Good",
      reviews: 16,
      imageUrl: "/img/f2.jpg"
    },
    {
      id: 3,
      name: "Urban Retreat",
      location: "Downtown, City",
      rating: "9.0",
      ratingText: "Superb",
      reviews: 42,
      imageUrl: "/img/f3.jpg"
    },
    {
      id: 4,
      name: "Garden Homestay",
      location: "Suburban Area, Region",
      rating: "8.2",
      ratingText: "Very Good",
      reviews: 31,
      imageUrl: "/img/f4.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Featured Properties</h2>
        <p className="text-gray-600">Discover our hand-picked accommodations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      
        <div className="md:flex-row items-start md:items-center justify-between mt-10">
          <div>
            <h3 className="text-xl font-bold mb-2">Special Offer</h3>
            <p className="text-gray-600">Book now and save up to 15% on your stay</p>
          </div>


          <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Go for a good time, not a long time
                  </h3>
                  <p className="text-gray-600">
                    Finish your year with a mini break. Save 15% or more when you book and stay by 7 January 2025.
                  </p>
                  <button className="mt-4 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                    Find Late Escape Deals
                  </button>
                </div>

                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
                  <img
                    src="/img/f1.jpg"
                    alt="Vacation scene"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>


        </div>
      </div>
   
  );
};

export default Offers;