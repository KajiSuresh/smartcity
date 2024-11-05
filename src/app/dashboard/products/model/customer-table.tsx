"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=80",
    totalSpent: "$2,345",
    orders: 12,
    status: "active"
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&q=80",
    totalSpent: "$1,678",
    orders: 8,
    status: "active"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&q=80",
    totalSpent: "$4,562",
    orders: 24,
    status: "inactive"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&q=80",
    totalSpent: "$4,562",
    orders: 24,
    status: "inactive"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&q=80",
    totalSpent: "$4,562",
    orders: 24,
    status: "inactive"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&q=80",
    totalSpent: "$4,562",
    orders: 24,
    status: "inactive"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&q=80",
    totalSpent: "$4,562",
    orders: 24,
    status: "inactive"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&q=80",
    totalSpent: "$4,562",
    orders: 24,
    status: "inactive"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&q=80",
    totalSpent: "$4,562",
    orders: 24,
    status: "inactive"
  },
  
]

export function CustomerTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={customer.image} alt={customer.name} />
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {customer.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>{customer.totalSpent}</TableCell>
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
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit customer</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete customer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}