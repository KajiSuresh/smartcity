"use client";

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
import { EditStudentModuleDrawer } from './EditStudentModuleDrawer';

interface StudentModule {
  studentId: number;
  name: string;
  type: string;
  address: string;
  contact: string;
  description: string;
  latitude: string;
  longitude: string;
  image: string | null;
}

interface StudentModuleTableProps {
  searchQuery: string;
  refresh: boolean;
}

export function StudentModuleTable({ searchQuery, refresh }: StudentModuleTableProps) {
  const [studentModuleData, setStudentModuleData] = useState<StudentModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<StudentModule | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  useEffect(() => {
    fetchStudentModuleData();
  }, [refresh]);

  const fetchStudentModuleData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/student_module');
      if (!response.ok) throw new Error('Failed to fetch student module data');
      const data = await response.json();
      setStudentModuleData(data);
    } catch (error) {
      console.error('Error fetching student module data:', error);
    }
  };

  const handleDeleteClick = async (studentId: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(`http://localhost:8080/api/student_module/${studentId}`, { method: 'DELETE' });
        alert("Item deleted successfully.");
        fetchStudentModuleData();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  const filteredData = studentModuleData.filter((module) =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Module Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((module) => (
            <TableRow key={module.studentId}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {module.image ? (
                    <Image
                      src={`http://localhost:8080/uploads/images/${module.image}`}
                      alt={module.name}
                      width={100}
                      height={100}
                      className="object-cover rounded" 
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 rounded-full" /> 
                  )}
                  <span className="font-medium">{module.name}</span>
                </div>
              </TableCell>
              <TableCell>{module.type}</TableCell>
              <TableCell>{module.address}</TableCell>
              <TableCell>{module.contact}</TableCell>
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
                      setSelectedModule(module);
                      setIsEditDrawerOpen(true);
                    }}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(module.studentId)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditStudentModuleDrawer
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        initialData={selectedModule}
        onUpdate={fetchStudentModuleData}
      />
    </div>
  );
}
