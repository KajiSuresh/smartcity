"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users 
} from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: DollarSign,
      description: "+20.1% from last month"
    },
    {
      title: "Customers",
      value: "2,350",
      icon: Users,
      description: "+180 new customers"
    },
    {
      title: "Products",
      value: "456",
      icon: Package,
      description: "48 products added today"
    },
    {
      title: "Orders",
      value: "789",
      icon: ShoppingCart,
      description: "+201 since last week"
    },
  ]

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <p className="text-muted-foreground">Activity feed coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}