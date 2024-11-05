import React from 'react';
import { ChevronRight, Heart, Umbrella, Building2, Tent, Coffee } from 'lucide-react';

const TravelCard = ({ image, title, description, size = "medium" }: {
  image: string;
  title: string; 
  description: string;
  size?: "medium" | "large";
}) => (
  <div className={`flex-shrink-0 relative group cursor-pointer 
    ${size === "large" ? "w-full md:w-[800px]" : "w-[300px]"}`}>
    <div className={`relative overflow-hidden rounded-lg
      ${size === "large" ? "h-[400px]" : "h-[200px]"}`}>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-sm text-white/90">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const CategoryButton = ({ 
  icon: Icon, 
  label,
  active 
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
}) => (
  <button 
    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors
    ${active 
      ? "bg-gradient-to-r from-red-500 to-red-400 text-white border-blue-600" 
      : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

const Tab = () => {
  const inspirationCards = [
    {
      image: "/img/f1.jpg",
      title: "New Year's Eve in New York City",
      description: "Ring in the new year with iconic moments and unforgettable memories in New York City",
      size: "large"
    },
    {
      image: "/img/f2.jpg",
      title: "6 best ryokans in Japan",
      description: "Discover unmissable ryokans to relax and unwind in style.",
    },
    {
      image: "/img/f3.jpg",
      title: "Best places in Asia to celebrate Christmas",
      description: "Discover the shimmering lights and festive sights of Asia's holiday season.",
    },
    {
      image: "/img/f4.jpg",
      title: "Winter getaways in Europe",
      description: "Explore charming winter destinations across Europe.",
    }
  ];

  const categories = [
    { icon: Heart, label: "Romance", active: false },
    { icon: Umbrella, label: "Beach", active: true },
    { icon: Building2, label: "City", active: false },
    { icon: Tent, label: "Outdoors", active: false },
    { icon: Coffee, label: "Relax", active: false },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Inspiration Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Get inspiration for your next trip</h2>
          <button className="text-blue-600 font-medium hover:underline flex items-center gap-1">
            More
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4">
              {inspirationCards.map((card, index) => (
                <TravelCard 
                  key={index} 
                  image={card.image}
                  title={card.title} 
                  description={card.description}
                  size={card.size as "medium" | "large" | undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trip Planner Section */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Quick and easy trip planner</h2>
        <p className="text-gray-600 mb-6">Pick a vibe and explore the top destinations in the United Kingdom</p>
        
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-3">
            {categories.map((category, index) => (
              <CategoryButton key={index} {...category} />
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-hide mt-6">
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex-shrink-0 w-[200px] h-[150px] rounded-lg overflow-hidden">
                <img
                  src={`/img/f4.jpg`}
                  alt={`Destination ${item}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;