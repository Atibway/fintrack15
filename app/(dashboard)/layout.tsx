"use client"
import Sidebar from "@/components/layout/Sidebar"
import type React from "react"

import TopBar from "@/components/layout/TopBar"
import { useCurrentUser } from "@/hooks/use-current-user"
import { cn } from "@/lib/utils"
import "./App.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

type Props = {
  children: React.ReactNode
}
const layout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const isLoggedIn = useCurrentUser()

  // Use useEffect for client-side redirects to avoid hydration mismatches
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  // Return a loading state or null during the authentication check
  if (!isLoggedIn) {
    return null // Or a loading spinner
  }

  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className={cn("flex-1 p-3", collapsed ? "md:ml-[70px]" : "md:ml-[250px]")}>{children}</main>
        </div>
      </div>
    </>
  )
}

export default layout

