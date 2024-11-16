'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Types
interface Tourism {
  tourism_id: number;
  name: string;
  description: string;
  image: string;
  type: string;
}

interface TravelCardProps {
  image: string;
  name: string;
  description: string;
  size?: "medium" | "large";
}

interface CategoryButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

// Components
const TravelCard: React.FC<TravelCardProps> = ({ 
  image, 
  name, 
  description, 
  size = "medium" 
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`flex-shrink-0 relative group cursor-pointer
        ${size === "large" ? "w-full md:w-[800px]" : "w-[300px]"}`}
    >
      <div 
        className={`relative overflow-hidden rounded-lg
          ${size === "large" ? "h-[400px]" : "h-[200px]"}`}
      >
        <Image
          src={imageError ? '/placeholder.jpg' : image}
          alt={name}
          layout="fill"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-xl mb-2 line-clamp-1">{name}</h3>
            <p className="text-sm text-white/90 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  label, 
  active, 
  onClick 
}) => (
  <button 
    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors
      ${active 
        ? "bg-gradient-to-r from-red-500 to-red-400 text-white border-blue-600" 
        : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
      }`}
    onClick={onClick}
    type="button"
  >
    <span>{label}</span>
  </button>
);

const Tab: React.FC = () => {
  const [tourismData, setTourismData] = useState<Tourism[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourismData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tourism');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as Tourism[];
        setTourismData(data);

        // Extract unique types for categories
        const uniqueTypes = Array.from(new Set(data.map(item => item.type)));
        setCategories(uniqueTypes.sort()); // Sort categories alphabetically
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching tourism data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTourismData();
  }, []);

  // Filtered tourism data based on selected category
  const filteredTourismData = selectedCategory 
    ? tourismData.filter(item => item.type === selectedCategory) 
    : tourismData;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-red-600">
        <p>Error loading tourism data: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Trip Planner Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Quick and easy trip planner</h2>
        <p className="text-gray-600 mb-6">
          Pick a vibe and explore the top destinations in the United Kingdom
        </p>
        
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-3">
            {categories.map((category) => (
              <CategoryButton 
                key={category} 
                label={category} 
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
            <CategoryButton
              label="All"
              active={selectedCategory === null}
              onClick={() => setSelectedCategory(null)}
            />
          </div>
        </div>
      </div>

      {/* Inspiration Section */}
      <div>
        <h2 className="text-2xl font-bold">Get inspiration for your next trip</h2>
        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4">
              {loading ? (
                <div className="w-full text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                </div>
              ) : filteredTourismData.length === 0 ? (
                <p className="text-gray-500 text-center w-full py-8">
                  No destinations found for this category.
                </p>
              ) : (
                filteredTourismData.map((tourism) => (
                  <TravelCard 
                    key={tourism.tourism_id}
                    image={`http://localhost:8080/uploads/images/${tourism.image}`}
                    name={tourism.name}
                    description={tourism.description}
                    size="medium"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;