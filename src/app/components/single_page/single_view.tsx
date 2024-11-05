import { Star, MapPin, Share2, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from 'next/link';

export default function SinglePage() {
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
              <Badge variant="secondary">Beach</Badge>
              <Badge variant="secondary">Airport shuttle</Badge>
            </div>
            <h2 className="text-3xl font-bold mb-2">Hotel Dorset</h2>
            <div className="flex items-center text-blue-600">
              <MapPin className="w-4 h-4 mr-2" />
              <p>70/1A Cemetery road, Negombo, 11500 Negombo, Sri Lanka</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button>Reserve</Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-2 relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/img/f2.jpg"
              alt="Hotel main"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="relative h-[192px] rounded-lg overflow-hidden">
              <Image
                src="/img/f2.jpg"
                alt="Hotel room"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[192px] rounded-lg overflow-hidden">
              <Image
                src="/img/f2.jpg"
                alt="Hotel bathroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="relative h-[192px] rounded-lg overflow-hidden">
              <Image
                src="/img/f2.jpg"
                alt="Hotel pool"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[192px] rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src="/img/f2.jpg"
                alt="More photos"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">+37 photos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Property highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Perfect location</p>
                    <p className="text-gray-600">Situated in the best rated area in Negombo, this hotel has an excellent location score of 8.6</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Breakfast included</p>
                    <p className="text-gray-600">Continental, Full English/Irish, Vegetarian, Vegan, Halal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-600 mb-4">
                Located just 1.5 km from Negombo Beach, Hotel Dorset offers comfortable accommodations with modern amenities. The property features a restaurant, outdoor swimming pool, fitness center, and free WiFi throughout the property.
              </p>
              <Button variant="link" className="flex items-center gap-2 text-blue-600">
                Read more <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-xl font-semibold mb-4">Price details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>1 night</span>
                <span className="font-semibold">$120</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taxes and fees</span>
                <span className="font-semibold">$24</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">$144</span>
                </div>
              </div>
              <Link href="/reservation">
                <Button className="w-full">Reserve now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}