import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Wifi, Car } from "lucide-react";
import SearchBar from "@/app/components/filter/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <SearchBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 mt-10">
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-semibold mb-2">Lodge</h2>
              <h3 className="text-xl font-bold mb-2">Niyagala Lodge</h3>
              <p className="text-sm text-gray-600 mb-4">163 Jayadewa Mawatha, 21120 Sigiriya, Sri Lanka</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#003580] text-white px-2 py-1 rounded text-sm">
                  10
                </div>
                <span className="font-semibold">Exceptional</span>
                <span className="text-gray-600">· 5 reviews</span>
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Wifi size={16} />
                  <span>Free WiFi</span>
                </div>
                <div className="flex items-center gap-1">
                  <Car size={16} />
                  <span>Parking</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Your booking details</h3>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">Check-in</p>
                  <p className="text-sm">Mon 4 Nov 2024</p>
                  <p className="text-sm text-gray-600">13:00 – 21:00</p>
                </div>
                <div>
                  <p className="font-semibold">Check-out</p>
                  <p className="text-sm">Thu 7 Nov 2024</p>
                  <p className="text-sm text-gray-600">06:00 – 12:00</p>
                </div>
              </div>
              <p className="text-sm mb-2">Total length of stay:</p>
              <p className="font-semibold mb-4">3 nights</p>
              <p className="text-sm mb-2">You selected</p>
              <p className="font-semibold">1 room for 2 adults</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Your price summary</h3>
              <div className="flex justify-between items-center bg-[#ebf3ff] p-4 rounded">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">US$84</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Includes taxes and charges</p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-2/3 bg-white p-8 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#003580] text-white flex items-center justify-center">
                2
              </div>
              <h2 className="text-xl font-bold">Your details</h2>
            </div>

            <div className="mb-8 p-4 bg-[#f5f5f5] rounded">
              <p className="flex items-center gap-2">
                <span className="text-gray-600">Almost done! Just fill in the</span>
                <span className="text-red-500">*</span>
                <span className="text-gray-600">required info</span>
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <Input type="text" className="w-full" />
                </div>
                <div>
                  <label className="block mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <Input type="text" className="w-full" />
                </div>
              </div>

              <div>
                <label className="block mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <Input type="email" className="w-full" />
                <p className="text-sm text-gray-600 mt-1">Confirmation email goes to this address</p>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="save-details" />
                <div>
                  <label htmlFor="save-details" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Save my details so I can book faster next time
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    By signing in or creating an account, you agree with our Terms & conditions and Privacy statement
                  </p>
                </div>
              </div>

              <div>
                <label className="block mb-2">
                  Country/region <span className="text-red-500">*</span>
                </label>
                <Select>
                  <option value="LK">Sri Lanka</option>
                </Select>
              </div>

              <div>
                <label className="block mb-2">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <Select>
                    <option value="LK">LK +94</option>
                  </Select>
                  <Input type="tel" className="flex-1" />
                </div>
                <p className="text-sm text-gray-600 mt-1">Needed by the property to validate your booking</p>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="paperless" defaultChecked />
                <div>
                  <label htmlFor="paperless" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Yes, I&apos;d like free paperless confirmation (recommended)
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    We&apos;ll text you a link to download our app
                  </p>
                </div>
              </div>

              <Button className="w-full bg-[#0071c2] hover:bg-[#005999] text-lg py-6">
                Complete booking
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}