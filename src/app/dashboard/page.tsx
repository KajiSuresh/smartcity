"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, FileText, DollarSign } from "lucide-react";

export default function Dashboard() {
  // State for counting data from backend
  const [totalRevenue, setTotalRevenue] = useState<string>("$0.00");
  const [customers, setCustomers] = useState<string>("0");
  const [products, setProducts] = useState<string>("0");
  const [orders, setOrders] = useState<string>("0");
  const [studentModules, setStudentModules] = useState<string>("0");

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetching counts from the backend API
        const revenueResponse = await fetch("http://localhost:8080/api/business/count");
        const customersResponse = await fetch("http://localhost:8080/api/users/count");
        const productsResponse = await fetch("http://localhost:8080/api/tourism/count");
        const ordersResponse = await fetch("http://localhost:8080/api/jobs/count");
        const studentModuleResponse = await fetch("http://localhost:8080/api/student_module/count");

        if (revenueResponse.ok && customersResponse.ok && productsResponse.ok && ordersResponse.ok && studentModuleResponse.ok) {
          const revenueData = await revenueResponse.json();
          const customersData = await customersResponse.json();
          const productsData = await productsResponse.json();
          const ordersData = await ordersResponse.json();
          const studentModuleData = await studentModuleResponse.json();

          setTotalRevenue(revenueData.count);
          setCustomers(customersData.count);
          setProducts(productsData.count);
          setOrders(ordersData.count);
          setStudentModules(studentModuleData.count);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  // Statistics data
  const stats = [
    {
      title: "Business",
      value: totalRevenue,
      icon: DollarSign,
     
    },
    {
      title: "Users",
      value: customers,
      icon: Users,
     
    },
    {
      title: "toursim",
      value: products,
      icon: Package,
      
    },
    {
      title: "Jobs",
      value: orders,
      icon: ShoppingCart,
     
    },
    {
      title: "Student Modules",
      value: studentModules,
      icon: FileText,
      
    }
  ];

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
           
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
