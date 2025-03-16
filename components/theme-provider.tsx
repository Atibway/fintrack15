"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // Add suppressHydrationWarning to help with React 19 hydration improvements
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

