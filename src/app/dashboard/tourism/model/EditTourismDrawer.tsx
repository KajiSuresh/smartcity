"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditTourismDrawerProps {
  open: boolean;
  onClose: () => void;
  initialData: Tourism | null;
  onUpdate: () => void;
}

interface Tourism {
  tourismId: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  description: string;
  latitude: string;
  longitude: string;
  image: string | null;
}

export function EditTourismDrawer({
  open,
  onClose,
  initialData,
  onUpdate,
}: EditTourismDrawerProps) {
  const [formData, setFormData] = useState<Tourism>({
    tourismId: 0,
    name: "",
    type: "Hotel",
    address: "",
    phone: "",
    description: "",
    latitude: "",
    longitude: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, image: file as unknown as string | null }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, type: value }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        form.append(key, value as Blob | string);
      }
    });

    // Debugging
    console.log("Updating tourism with ID:", formData.tourismId);
    console.log("Request URL:", `http://localhost:8080/api/tourism/${formData.tourismId}`);

    try {
      const response = await fetch(`http://localhost:8080/api/tourism/${formData.tourismId}`, {
        method: "PUT",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to update tourism location");
      }

      alert("Tourism location updated successfully.");
      onClose();
      onUpdate();
    } catch (error) {
      console.error("Failed to update tourism location:", error);
    } finally {
      setLoading(false);
    }
};


  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[480px]">
        <form onSubmit={onSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Tourism Location</SheetTitle>
            <SheetDescription>
              Modify the details below for the selected tourism location.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue={formData.type} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                  <SelectItem value="Attraction">Attraction</SelectItem>
                  <SelectItem value="Museum">Museum</SelectItem>
                  <SelectItem value="Park">Park</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input id="latitude" value={formData.latitude} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input id="longitude" value={formData.longitude} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Location"}
            </Button>
           
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
