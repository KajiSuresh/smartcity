'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface Entity {
  id: number;
  name: string;
  image: string;
  type: string;
}

const Offers = () => {
  const [entities, setEntities] = useState<Entity[]>([]);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        fetch('http://localhost:8080/api/business/first'),
        fetch('http://localhost:8080/api/jobs/first'),
        fetch('http://localhost:8080/api/student_module/first'),
        fetch('http://localhost:8080/api/tourism/first'),
      ]);
  
      const data = await Promise.all(
        responses.map(async (res, index) => {
          if (!res.ok) {
            console.error(`Error fetching data from endpoint ${index + 1}:`, res.statusText);
            return null;
          }
          return await res.json();
        })
      );
  
      setEntities(
        data
          .filter((d) => d !== null)
          .map((d, index) => {
            const entityType = ['business', 'jobs', 'student_module', 'tourism'][index];
            
            const id =
              entityType === 'business'
                ? d.business_id
                : entityType === 'jobs'
                ? d.job_id
                : entityType === 'student_module'
                ? d.student_id
                : d.tourism_id;
  
            return {
              id: id || `placeholder-${index}`,
              name: entityType === 'jobs' ? d.companyName : d.name,

              image: d.image ? `http://localhost:8080/uploads/images/${d.image}` : '/placeholder.png',
              type: entityType,
            };
          })
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Featured Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {entities.map((entity) => (
          <Link 
            key={entity.id} 
            href={`/filter?category=${entity.type}&id=${entity.id}`}
            passHref
          >
            <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative group cursor-pointer w-[300px] h-[200px] overflow-hidden rounded-lg">
                <Image
                  src={entity.image}
                  alt={entity.name}
                  layout="fill"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  placeholder="empty"
                  onError={(e) => (e.currentTarget.src = '/placeholder.png')}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
                  <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-lg">{entity.name}</h3>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Offers;
