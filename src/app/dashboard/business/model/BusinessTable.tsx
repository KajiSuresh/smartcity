import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { EditBusinessDrawer } from './EditBusinessDrawer';

interface Business {
  businessId: number;
  name: string;
  category: string;
  address: string;
  contactInfo: string;
  description: string;
  website: string;
  latitude: string;
  longitude: string;
  image: string | null;
}

interface BusinessTableProps {
  searchQuery: string;
  refresh: boolean;
}

export function BusinessTable({ searchQuery, refresh }: BusinessTableProps) {
  const [businessData, setBusinessData] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  useEffect(() => {
    fetchBusinessData();
  }, [refresh]);

  const fetchBusinessData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/business');
      if (!response.ok) throw new Error('Failed to fetch business data');
      const data = await response.json();
      setBusinessData(data);
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
  };

  const handleDeleteClick = async (businessId: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(`http://localhost:8080/api/business/${businessId}`, { method: 'DELETE' });
        alert("Item deleted successfully.");
        fetchBusinessData();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  const filteredData = businessData.filter((business) =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((business) => (
            <TableRow key={business.businessId}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {business.image ? (
                    <Image
                      src={`http://localhost:8080/uploads/images/${business.image}`}
                      alt={business.name}
                      width={100} // Fixed width for all images
                      height={100} // Fixed height for all images
                      className="object-cover rounded" // Ensures the image covers the area
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 rounded-full" /> // Placeholder for no image
                  )}
                  <span className="font-medium">{business.name}</span>
                </div>
              </TableCell>
              <TableCell>{business.category}</TableCell>
              <TableCell>{business.address}</TableCell>
              <TableCell>{business.contactInfo}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {
                      setSelectedBusiness(business);
                      setIsEditDrawerOpen(true);
                    }}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(business.businessId)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditBusinessDrawer
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        initialData={selectedBusiness}
        onUpdate={fetchBusinessData}
      />
    </div>
  );
}
