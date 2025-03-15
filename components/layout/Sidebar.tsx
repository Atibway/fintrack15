"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PieChart,
  BarChart4,
  Wallet,
  Target,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  List,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderLogo from "../HeaderLogo";
import { LogoutButton } from "../auth/logout-button";
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>
}
const Sidebar = ({
collapsed,
setCollapsed
}:SidebarProps) => {
 
  const pathName = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
    { name: "Transactions", icon: <Wallet className="w-5 h-5" />, path: "/transactions" },
    { name: "Budget", icon: <Target className="w-5 h-5" />, path: "/budget" },
    { name: "Analytics", icon: <PieChart className="w-5 h-5" />, path: "/analytics" },
    { name: "Reports", icon: <BarChart4 className="w-5 h-5" />, path: "/reports" },
    { name: "Categories", icon: <List className="w-5 h-5" />, path: "/categories" },
    { name: "Accounts", icon: <CreditCard className="w-5 h-5" />, path: "/accounts" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <div
      className={cn(
        "fixed z-50 h-screen bg-card hidden border-r border-border transition-all duration-300 md:flex flex-col justify-between",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div>
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed && (
            <div className="flex items-center space-x-2 animate-fade-in">
              <HeaderLogo />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="py-4 px-2">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  "hover:bg-secondary group",
                  pathName === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 transition-transform",
                    pathName === item.path ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {item.icon}
                </div>
                {!collapsed && <span className="transition-opacity animate-fade-in">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t mb-6">
        <LogoutButton>
          <button
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="animate-fade-in">Logout</span>}
          </button>
        </LogoutButton>
      </div>
    </div>
  );
};

export default Sidebar;
