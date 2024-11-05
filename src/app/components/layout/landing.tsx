'use client'
import React from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Landing = () => {
  const [tripType, setTripType] = React.useState('round-trip');
  const [fromLocation, setFromLocation] = React.useState('');
  const [toLocation, setToLocation] = React.useState('');
  const [departDate, setDepartDate] = React.useState<Date>();
  const [returnDate, setReturnDate] = React.useState<Date>();

  const services = [
    {
      icon: "✈️",
      title: "Flights",
      isActive: true
    },
    {
      icon: "🏨",
      title: "Hotels",
      isActive: false
    },
    {
      icon: "💼",
      title: "WegoPro Business Travel",
      isNew: true,
      isActive: false
    }
  ];

  const additionalServices = [
    {
      title: "eSIM",
      description: "UNLOCK INSTANT CONNECTIVITY",
      bgColor: "bg-green-500",
      icon: "📱"
    },
    {
      title: "AIRPORT TRANSFER",
      description: "STRESS-FREE TRAVEL WITH",
      bgColor: "bg-yellow-500",
      icon: "🚕"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] sm:h-[600px]">
        <div className="absolute inset-0">
          <img
            src="/img/vietnam.jpg"
            alt="Forest background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-8 sm:pt-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-bold text-center mb-8 sm:mb-12">
            Discover the real value of travel
          </h1>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {services.map((service) => (
              <button
                key={service.title}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                  service.isActive ? 'bg-white' : 'bg-white/20 text-white'
                }`}
              >
                <span>{service.icon}</span>
                <span>{service.title}</span>
                {service.isNew && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">NEW</span>
                )}
              </button>
            ))}
          </div>

          {/* Search Card */}
          <Card className="p-4 sm:p-6 bg-white rounded-lg">
            {/* Trip Type Selection */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded ${
                  tripType === 'one-way' ? 'bg-gray-100' : 'text-gray-600'
                }`}
                onClick={() => setTripType('one-way')}
              >
                One-way
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  tripType === 'round-trip' ? 'bg-gray-100' : 'text-gray-600'
                }`}
                onClick={() => setTripType('round-trip')}
              >
                Round-trip
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  tripType === 'multi-city' ? 'bg-gray-100' : 'text-gray-600'
                }`}
                onClick={() => setTripType('multi-city')}
              >
                Multi-city
              </button>
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1">
                <label className="block text-sm text-gray-600 mb-1">From</label>
                <input
                  type="text"
                  placeholder="City or Airport"
                  className="w-full p-2 border rounded"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm text-gray-600 mb-1">To</label>
                <input
                  type="text"
                  placeholder="City or Airport"
                  className="w-full p-2 border rounded"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm text-gray-600 mb-1">Depart</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !departDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departDate ? format(departDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={departDate}
                      onSelect={setDepartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="col-span-1">
                <label className="block text-sm text-gray-600 mb-1">Return</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Additional Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm text-gray-600">Direct flight only</span>
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
                <Select defaultValue="1">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Adult</SelectItem>
                    <SelectItem value="2">2 Adults</SelectItem>
                    <SelectItem value="3">3 Adults</SelectItem>
                    <SelectItem value="4">4 Adults</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="economy">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="premium">Premium Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First Class</SelectItem>
                  </SelectContent>
                </Select>
                <button className="bg-green-500 text-white px-8 py-2 rounded w-full sm:w-auto">Search</button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Additional Services */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {additionalServices.map((service) => (
            <div
              key={service.title}
              className={`${service.bgColor} rounded-lg p-4 sm:p-6 text-white flex items-center justify-between`}
            >
              <div>
                <p className="text-sm">{service.description}</p>
                <h3 className="text-xl font-bold">{service.title}</h3>
              </div>
              <span className="text-4xl">{service.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;