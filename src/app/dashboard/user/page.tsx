"use client";

import React, { useState } from "react";
import { UserTablePage } from "./model/user-table";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input w-full max-w-xs"
        />
      </div>
      
      <UserTablePage searchQuery={searchQuery} />
    </div>
  );
}
