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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddStudentModuleDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

interface FormData {
  name: string;
  type: string;
  address: string;
  contact: string;
  description: string;
  latitude: string;
  longitude: string;
  image: File | null;
}

export function AddStudentModuleDrawer({ open, onClose, onUpdate }: AddStudentModuleDrawerProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "LIBRARY",
    address: "",
    contact: "",
    description: "",
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

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, type: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value as Blob | string);
    });
  
    try {
      await fetch("http://localhost:8080/api/student_module", {
        method: "POST",
        body: form,
      });
      alert("Student module added successfully.");
      onClose();
      onUpdate();
    } catch (error) {
      console.error("Failed to add student module:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[480px]">
        <form onSubmit={onSubmit}>
          <SheetHeader>
            <SheetTitle>Add New Student Module</SheetTitle>
            <SheetDescription>
              Fill in the details below to add a new student module.
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
                  <SelectItem value="LIBRARY">Library</SelectItem>
                  <SelectItem value="COACHING_CENTER">Coaching Center</SelectItem>
                  <SelectItem value="COLLEGE">College</SelectItem>
                  <SelectItem value="UNIVERSITY">University</SelectItem>
                  <SelectItem value="SCHOOL">School</SelectItem>
                  <SelectItem value="ONLINE_COURSE">Online Course</SelectItem>
                  <SelectItem value="TRAINING_INSTITUTE">Training Institute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" value={formData.contact} onChange={handleChange} />
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
              {loading ? "Adding..." : "Add Module"}
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