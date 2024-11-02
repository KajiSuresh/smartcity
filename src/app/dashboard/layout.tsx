"use client"

import { useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from './layouts/header'
import { Sidebar } from './layouts/sidebar'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} />
        <div className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        )}>
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}