"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@headlessui/react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [enabled, setEnabled] = React.useState(false)

  // Only update state after component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
    setEnabled(theme === "dark")
  }, [theme])

  const handleChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
    setEnabled(checked)
  }

  // Render a placeholder with the same dimensions during SSR to avoid layout shift
  if (!mounted) {
    return (
      <div className="flex items-center space-x-1">
        <div className="h-6 w-6 hidden md:block" />
        <div className="w-[120px] h-6" />
        <div className="h-6 w-6 hidden md:block" />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1" suppressHydrationWarning>
      <Sun className={`h-6 w-6 hidden md:block ${!enabled ? "text-yellow-500" : "text-gray-500"}`} />
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={`${
          enabled ? "bg-gray-700" : "bg-gray-300"
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors mx-0`}
      >
        <span className="sr-only">Enable dark mode</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
      <Moon className={`h-6 w-6 hidden md:block ${enabled ? "text-yellow-500" : "text-gray-500"}`} />
    </div>
  )
}

