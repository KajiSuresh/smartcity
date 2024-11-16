"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentModuleTable } from "./model/StudentModuleTable";
import { AddStudentModuleDrawer } from "./model/AddStudentModuleDrawer"; 

export default function StudentModulePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleRefreshTable = () => {
    setRefreshTable((prev) => !prev);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Student Modules</h2>
        <Button onClick={() => setDrawerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Module
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <StudentModuleTable searchQuery={searchQuery} refresh={refreshTable} />

      <AddStudentModuleDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        onUpdate={toggleRefreshTable} 
      />
    </div>
  );
}
