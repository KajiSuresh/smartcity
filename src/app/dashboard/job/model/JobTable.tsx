import React, { useEffect, useState } from "react";

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
import { EditJobDrawer } from './EditJobDrawer';

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

interface JobTableProps {
  searchQuery: string;
  refresh: boolean;
}

export function JobTable({ searchQuery, refresh }: JobTableProps) {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  useEffect(() => {
    fetchJobData();
  }, [refresh]);

  const fetchJobData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch job data');
      const data = await response.json();
      setJobData(data);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  const handleDeleteClick = async (jobId: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(`http://localhost:8080/api/jobs/${jobId}`, { method: 'DELETE' });
        alert("Item deleted successfully.");
        fetchJobData();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  const filteredData = jobData.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact Email</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((job) => (
            <TableRow key={job.jobId}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job.industry}</TableCell>
              <TableCell>{job.address}</TableCell>
              <TableCell>{job.contactEmail}</TableCell>
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
                      setSelectedJob(job);
                      setIsEditDrawerOpen(true);
                    }}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(job.jobId)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditJobDrawer
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        initialData={selectedJob}
        onUpdate={fetchJobData}
      />
    </div>
  );
}
