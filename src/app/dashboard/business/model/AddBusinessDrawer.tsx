"use client";

import { useState } from "react";
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

interface AddBusinessDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

interface FormData {
  name: string;
  category: string;
  address: string;
  contactInfo: string;
  description: string;
  website: string;
  latitude: string;
  longitude: string;
  image: File | null;
}

export function AddBusinessDrawer({ open, onClose, onUpdate }: AddBusinessDrawerProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    address: "",
    contactInfo: "",
    description: "",
    website: "",
    latitude: "",
    longitude: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, image: file }));
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

    try {
      await fetch("http://localhost:8080/api/business", {
        method: "POST",
        body: form,
      });
      alert("Business added successfully.");
      onClose();
      onUpdate();
    } catch (error) {
      console.error("Failed to add business:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[480px]">
        <form onSubmit={onSubmit}>
          <SheetHeader>
            <SheetTitle>Add New Business</SheetTitle>
            <SheetDescription>
              Fill in the details below to add a new business location.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Info</Label>
              <Input id="contactInfo" value={formData.contactInfo} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" value={formData.website} onChange={handleChange} />
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
              {loading ? "Adding..." : "Add Business"}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Close
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
