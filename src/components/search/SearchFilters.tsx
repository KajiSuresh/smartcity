'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";



import { Search } from "lucide-react";

import PlaceSelect from "./PlaceSelect";
import PassengerSelect from "./PassengerSelect";
import DatePicker from "./DatePicker";

export default function SearchFilters() {
  return (
    <Card className="p-6 w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Find your next adventure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Where to?</label>
            <PlaceSelect />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">When?</label>
            <DatePicker />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Passengers</label>
            <PassengerSelect />
          </div>
        </div>
        <Button className="w-full" size="lg">
          <Search className="mr-2 h-4 w-4" /> Search Flights
        </Button>
      </div>
    </Card>
  );
}