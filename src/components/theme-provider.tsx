"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(false)

  }
    , [])
  if (loading) {
    return (<div> 
      loading

    </div>)
  }
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}