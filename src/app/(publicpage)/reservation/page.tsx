'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchBar from "@/app/components/filter/SearchBar"; // Import SearchBar

// Define types for tourism details
interface Tourism {
  id: number;
  name: string;
  address: string;
  phone: string;
  description: string;
  type: string;
  latitude: number;
  longitude: number;
  image: string;
}

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [tourism, setTourism] = useState<Tourism | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    members: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
  });

  useEffect(() => {
    if (id) {
      const fetchTourismDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/tourism/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch tourism data');
          }
          const data: Tourism = await response.json();
          setTourism(data);
        } catch (error) {
          console.error("Error fetching tourism data:", error);
        }
      };
      fetchTourismDetails();
    }
  }, [id]);

  const handleBookingDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Prepare the reservation data to be sent to the backend
    const reservationData = {
      tourismId: id,
      firstName: bookingDetails.firstName,
      lastName: bookingDetails.lastName,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      country: bookingDetails.country,
      reservationDate: bookingDetails.date,
      reservationTime: bookingDetails.time,
      numberOfMembers: bookingDetails.members,
    };

    try {
      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      alert("Booking submitted successfully!");
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Failed to submit booking. Please try again.");
    }
  };

  if (!tourism) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Add SearchBar at the top */}
      <SearchBar />

      <main className="max-w-7xl mx-auto px-4 py-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Tourism details */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-semibold mb-2">{tourism.type}</h2>
              <h3 className="text-xl font-bold mb-2">{tourism.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{tourism.address}</p>
            </div>

            {/* Booking Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Your booking details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Reservation Date</Label>
                  <Input
                    id="date"
                    type="date"
                    name="date"
                    value={bookingDetails.date}
                    onChange={handleBookingDetailsChange}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    name="time"
                    value={bookingDetails.time}
                    onChange={handleBookingDetailsChange}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="members">Number of Members</Label>
                  <Input
                    id="members"
                    type="number"
                    name="members"
                    value={bookingDetails.members}
                    onChange={handleBookingDetailsChange}
                    min="1"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - User details form */}
          <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Your details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">
                    First name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="firstName" type="text" value={bookingDetails.firstName} onChange={handleBookingDetailsChange} className="mt-2" name="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">
                    Last name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="lastName" type="text" value={bookingDetails.lastName} onChange={handleBookingDetailsChange} className="mt-2" name="lastName" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">
                  Email address <span className="text-red-500">*</span>
                </Label>
                <Input id="email" type="email" value={bookingDetails.email} onChange={handleBookingDetailsChange} className="mt-2" name="email" required />
                <p className="text-sm text-gray-600 mt-1"></p>
              </div>

              <div>
                <Label htmlFor="phone">
                  Phone number <span className="text-red-500">*</span>
                </Label>
                <Input id="phone" type="text" value={bookingDetails.phone} onChange={handleBookingDetailsChange} className="mt-2" name="phone" required />
              </div>

              <div>
                <Label htmlFor="country">
                  Country/region <span className="text-red-500">*</span>
                </Label>
                <Input id="country" type="text" value={bookingDetails.country} onChange={handleBookingDetailsChange} className="mt-2" name="country" required />
              </div>

              <Button type="submit" className="w-full bg-[#0071c2] hover:bg-[#005999] text-lg py-6">
                Complete booking
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
