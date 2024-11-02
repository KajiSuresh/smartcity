'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

export default function PassengerSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select passengers" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 Passenger</SelectItem>
        <SelectItem value="2">2 Passengers</SelectItem>
        <SelectItem value="3">3 Passengers</SelectItem>
        <SelectItem value="4">4 Passengers</SelectItem>
        <SelectItem value="5">5+ Passengers</SelectItem>
      </SelectContent>
    </Select>
  );
}