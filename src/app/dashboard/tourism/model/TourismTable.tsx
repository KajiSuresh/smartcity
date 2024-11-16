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
import { EditTourismDrawer } from './EditTourismDrawer';

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

interface TourismTableProps {
  searchQuery: string;
  refresh: boolean;
}

export function TourismTable({ searchQuery, refresh }: TourismTableProps) {
  const [tourismData, setTourismData] = useState<Tourism[]>([]);
  const [selectedTourism, setSelectedTourism] = useState<Tourism | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  useEffect(() => {
    fetchTourismData();
  }, [refresh]);

  const fetchTourismData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tourism');
      if (!response.ok) throw new Error('Failed to fetch tourism data');
      const data = await response.json();
      setTourismData(data);
    } catch (error) {
      console.error('Error fetching tourism data:', error);
    }
  };

  const handleDeleteClick = async (tourismId: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(`http://localhost:8080/api/tourism/${tourismId}`, { method: 'DELETE' });
        alert("Item deleted successfully.");
        fetchTourismData();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  const filteredData = tourismData.filter((tourism) =>
    tourism.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tourism.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tourism.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tourism Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((tourism) => (
            <TableRow key={tourism.tourismId}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {tourism.image ? (
                    <Image
                      src={`http://localhost:8080/uploads/images/${tourism.image}`}
                      alt={tourism.name}
                      width={100} // Fixed width for all images
                      height={100} // Fixed height for all images
                      className="object-cover rounded" // Ensures the image covers the area
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 rounded-full" /> // Placeholder for no image
                  )}
                  <span className="font-medium">{tourism.name}</span>
                </div>
              </TableCell>
              <TableCell>{tourism.type}</TableCell>
              <TableCell>{tourism.address}</TableCell>
              <TableCell>{tourism.phone}</TableCell>
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
                      setSelectedTourism(tourism);
                      setIsEditDrawerOpen(true);
                    }}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(tourism.tourismId)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditTourismDrawer
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        initialData={selectedTourism}
        onUpdate={fetchTourismData}
      />
    </div>
  );
}
