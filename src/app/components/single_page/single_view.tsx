"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Star, MapPin, Share2, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Entity, isBusiness, isTourism, isStudentModule, isJob } from "./types"; // Import types and guards

export default function SinglePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const id = searchParams.get("id");

  const [entity, setEntity] = useState<Entity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEntityData = async () => {
      if (!category || !id) return;

      try {
        const response = await fetch(`http://localhost:8080/api/${category}/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch entity data");
        }

        const data = await response.json();
        setEntity(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEntityData();
  }, [category, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!entity) {
    return <p>No data available.</p>;
  }

  const entityName = isBusiness(entity) || isStudentModule(entity) || isTourism(entity)
    ? entity.name
    : isJob(entity)
    ? entity.title
    : "";

  const entityCategoryOrType = isBusiness(entity)
    ? entity.category
    : isTourism(entity)
    ? entity.type // Tourism has a 'type' field
    : isStudentModule(entity)
    ? entity.type
    : isJob(entity)
    ? entity.industry
    : "";

  const handleReserveClick = () => {
    
    window.location.href = `/reservation?id=${id}`;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[1, 2, 3].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Badge variant="secondary">{entityCategoryOrType}</Badge>
            </div>
            <h2 className="text-3xl font-bold mb-2">{entityName}</h2>
            <div className="flex items-center text-blue-600">
              <MapPin className="w-4 h-4 mr-2" />
              <p>{entity.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            {/* Show Reserve button only if the entity is Tourism and the type is 'RESTAURANT' */}
            {isTourism(entity) && entity.type === "RESTAURANT" && (
              <Button onClick={handleReserveClick}>Reserve</Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Main Image Section */}
          <div className="col-span-1 relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src={entity.image ? `http://localhost:8080/uploads/images/${entity.image}` : "/placeholder.png"}
              alt={entityName}
              fill
              className="object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Property Highlights</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Perfect location</p>
                  <p className="text-gray-600">Excellent location in {entity.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-600 mb-4">{entity.description}</p>
              <Button variant="link" className="flex items-center gap-2 text-blue-600">
                Read more <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              {isBusiness(entity) && entity.contactInfo && <p>Contact: {entity.contactInfo}</p>}
              {isStudentModule(entity) && entity.contact && <p>Contact: {entity.contact}</p>}
              {isJob(entity) && entity.contactEmail && <p>Email: {entity.contactEmail}</p>}
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="col-span-1 mb-8">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCvjP6twWUyOTmC9v9lH_aD7F3WpM5u6oQ&q=${entity.latitude},${entity.longitude}`}
            width="100%"
            height="500px"
            className="rounded-lg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
