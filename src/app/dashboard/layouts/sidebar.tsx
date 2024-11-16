"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
 
  Users, 
 
  Package, 
  LayoutDashboard,
  MessagesSquare,
  ShoppingCart,
  FileText,

} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    
    {
      label: "User",
      icon: Users,
      href: "/dashboard/user",
    },
    {
      label: "Tourism",
      icon: Package,
      href: "/dashboard/tourism",
    },
    {
      label: "Business",
      icon: ShoppingCart,
      href: "/dashboard/business",
    },
    {
      label: "Job",
      icon: MessagesSquare,
      href: "/dashboard/job",
    },
    {
      label: "Student",
      icon: FileText,
      href: "/dashboard/student",
    },
    
  ]

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-2">
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href && "bg-muted"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-5 w-5" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}