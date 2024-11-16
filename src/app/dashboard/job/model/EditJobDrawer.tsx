"use client";

import { useEffect, useState } from "react";
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

interface EditJobDrawerProps {
  open: boolean;
  onClose: () => void;
  initialData: Job | null;
  onUpdate: () => void;
}

interface Job {
  jobId: number;
  title: string;
  companyName: string;
  industry: string;
  address: string;
  latitude: string;
  longitude: string;
  description: string;
  salaryRange: string;
  postingDate: string;
  contactEmail: string;
  image: string | null;
}

export function EditJobDrawer({
  open,
  onClose,
  initialData,
  onUpdate,
}: EditJobDrawerProps) {
  const [formData, setFormData] = useState<Job>({
    jobId: 0,
    title: "",
    companyName: "",
    industry: "TECHNOLOGY",
    address: "",
    latitude: "",
    longitude: "",
    description: "",
    salaryRange: "",
    postingDate: "",
    contactEmail: "",
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
    setFormData((prevData) => ({ ...prevData, industry: value }));
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
      const response = await fetch(`http://localhost:8080/api/jobs/${formData.jobId}`, {
        method: "PUT",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      alert("Job updated successfully.");
      onClose();
      onUpdate();
    } catch (error) {
      console.error("Failed to update job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[480px]">
        <form onSubmit={onSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Job</SheetTitle>
            <SheetDescription>
              Modify the details below for the selected job.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select defaultValue={formData.industry} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                  <SelectItem value="FINANCE">Finance</SelectItem>
                  <SelectItem value="HEALTHCARE">Healthcare</SelectItem>
                  <SelectItem value="EDUCATION">Education</SelectItem>
                  <SelectItem value="RETAIL">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={formData.address} onChange={handleChange} required />
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
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryRange">Salary Range</Label>
              <Input id="salaryRange" value={formData.salaryRange} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postingDate">Posting Date</Label>
              <Input id="postingDate" type="date" value={formData.postingDate} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Job"}
            </Button>
            
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
