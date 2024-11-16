'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns'; // Add this import to fix the format error

interface Business {
  businessId: number;
  name: string;
  category: string;
  address: string;
  contactInfo?: string;
  description?: string;
  website?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
}

interface Job {
  jobId: number;
  title: string;
  companyName: string;
  industry: string;
  address?: string;
  description?: string;
  salaryRange?: string;
  postingDate?: string;
  contactEmail?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
}

interface StudentModule {
  studentId: number;
  name: string;
  type: string;
  address: string;
  contact?: string;
  description?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
}

interface Tourism {
  tourismId: number;
  name: string;
  type: string;
  address: string;
  phone?: string;
  description?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
}

type EntityType = Business | Job | StudentModule | Tourism;

const FilterPage = () => {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [entities, setEntities] = useState<EntityType[]>([]);
  const [filteredEntities, setFilteredEntities] = useState<EntityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { icon: '💼', label: 'jobs' },
    { icon: '🏖️', label: 'tourism' },
    { icon: '🎓', label: 'student_module' },
    { icon: '🏢', label: 'business' },
  ];

  // Filter states
  const [filterValues, setFilterValues] = useState({
    type: [] as string[],
    location: [] as string[],
  });

  // Utility functions to get entity properties
  const getEntityId = useCallback((entity: EntityType): number | null => {
    switch (category) {
      case 'business': return (entity as Business).businessId;
      case 'jobs': return (entity as Job).jobId;
      case 'student_module': return (entity as StudentModule).studentId;
      case 'tourism': return (entity as Tourism).tourismId;
      default: return null;
    }
  }, [category]);

  const getName = useCallback((entity: EntityType): string => {
    switch (category) {
      case 'business': return (entity as Business).name;
      case 'jobs': return (entity as Job).companyName;
      case 'student_module': return (entity as StudentModule).name;
      case 'tourism': return (entity as Tourism).name;
      default: return 'Untitled';
    }
  }, [category]);

  const getType = useCallback((entity: EntityType): string => {
    switch (category) {
      case 'business': return (entity as Business).category;
      case 'jobs': return (entity as Job).industry;
      case 'student_module': return (entity as StudentModule).type;
      case 'tourism': return (entity as Tourism).type;
      default: return '';
    }
  }, [category]);

  const getUniqueTypes = useCallback(() => {
    return Array.from(new Set(entities.map(entity => getType(entity))));
  }, [entities, getType]);

  // Filtering logic
  useEffect(() => {
    let filtered = [...entities];

    // Apply type filters
    if (filterValues.type.length > 0) {
      filtered = filtered.filter(entity =>
        filterValues.type.includes(getType(entity))
      );
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entity =>
        getName(entity).toLowerCase().includes(query) ||
        entity.description?.toLowerCase().includes(query) ||
        entity.address?.toLowerCase().includes(query)
      );
    }

    setFilteredEntities(filtered);
  }, [entities, filterValues, getType, getName, searchQuery]);

  // Fetch data based on category
  useEffect(() => {
    const fetchData = async () => {
      if (!category) {
        setError('Missing category');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/${category}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setEntities(data);
        setFilteredEntities(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-60 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Return to Home
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-red-500 to-red-400 h-[250px] w-full absolute top-0 left-0" />
        <div className="container mx-auto px-4 relative pt-16">
          <div className="flex gap-4 mb-6">
            {categories.map(({ icon, label }) => (
              <Button
                key={label}
                variant="outline"
                className={`${
                  category === label
                    ? 'border-blue-500 border-2 text-blue-600 shadow-md scale-105'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300'
                } flex items-center gap-2 px-6 py-3 rounded-full bg-white`}
                onClick={() => setCategory(label)}
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">
                  {label.charAt(0).toUpperCase() + label.slice(1).replace('_', ' ')}
                </span>
              </Button>
            ))}
          </div>
          
          <div className="flex gap-4 bg-white p-6 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-48">
                  {selectedDate ? format(selectedDate, 'PP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
              </PopoverContent>
            </Popover>

            <Button 
              className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Filters */}
          <div className="md:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="mb-6">
                <h4 className="font-medium mb-3">Type</h4>
                <div className="space-y-2">
                  {getUniqueTypes().map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={type}
                        checked={filterValues.type.includes(type)}
                        onCheckedChange={() => {
                          setFilterValues(prev => ({
                            ...prev,
                            type: prev.type.includes(type)
                              ? prev.type.filter(t => t !== type)
                              : [...prev.type, type]
                          }));
                        }}
                      />
                      <label htmlFor={type} className="text-sm font-medium leading-none">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="md:col-span-4">
            <div className="space-y-6">
              {filteredEntities.map((entity) => (
                <Card 
                  key={getEntityId(entity)} 
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative h-[300px]">
                      <Image
                        src={entity.image 
                          ? `http://localhost:8080/uploads/images/${entity.image}` 
                          : '/placeholder.png'
                        }
                        alt={getName(entity)}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.png';
                        }}
                      />
                      <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                        <Heart className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    <div className="md:col-span-2 p-6">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {getName(entity)}
                              </h2>
                              <p className="text-gray-600">{getType(entity)}</p>
                            </div>
                          </div>

                          {entity.address && (
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                              <MapPin className="w-5 h-5" />
                              <span>{entity.address}</span>
                            </div>
                          )}

                          {entity.description && (
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {entity.description}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="text-gray-600">
                            {/* Contact information based on category */}
                            {category === 'business' && (entity as Business).contactInfo && (
                              <p>Contact: {(entity as Business).contactInfo}</p>
                            )}
                            {category === 'jobs' && (entity as Job).contactEmail && (
                              <p>Email: {(entity as Job).contactEmail}</p>
                            )}
                            {category === 'student_module' && (entity as StudentModule).contact && (
                              <p>Contact: {(entity as StudentModule).contact}</p>
                            )}
                            {category === 'tourism' && (entity as Tourism).phone && (
                              <p>Phone: {(entity as Tourism).phone}</p>
                            )}
                          </div>

                          <Link
                            href={`/single_page?category=${category}&id=${getEntityId(entity)}`}
                            className="bg-gradient-to-r from-red-500 to-red-400 text-white px-6 py-3 rounded-md hover:from-red-600 hover:to-red-500 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
