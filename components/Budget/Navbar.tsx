"use client"
import { cn } from "@/lib/utils";
import { ChevronLeft, Home, PieChart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocation } from "react-use";

interface NavbarProps {
  title?: string;
  showBackButton?: boolean;
  transparent?: boolean;
}

const Navbar = ({ title, showBackButton = false, transparent = false }: NavbarProps) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Add scroll listener to change navbar appearance when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const links = [
    { path: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/budgets", label: "Budgets", icon: <PieChart className="w-5 h-5" /> },
  ];
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        (isScrolled || !transparent) 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <button 
                onClick={() => window.history.back()} 
                className="mr-2 p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            
            {title && (
              <h1 className="text-xl font-semibold animate-fade-in">{title}</h1>
            )}
            
            <nav className="hidden md:flex items-center ml-8 space-x-6">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === link.path 
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="md:hidden">
            <button
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "flex items-center text-sm font-medium py-2 transition-colors hover:text-primary",
                  location.pathname === link.path 
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
