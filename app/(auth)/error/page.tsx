

"use client"

import { redirect } from 'next/navigation'
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-use';
import Link from "next/link";
import { useCurrentUser } from '@/hooks/use-current-user';
import { FaExclamationTriangle } from 'react-icons/fa';

const LoginErrorPage = () => {
  const location = useLocation();
  const isLoggedIn =  useCurrentUser()

  if(isLoggedIn){
    
    redirect("/")
  }

  useEffect(() => {
    console.error(
      "404 Error: `Error attempting to login`:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-login-gradient flex flex-col items-center justify-center p-4">
      <div className="login-card p-10 rounded-lg max-w-md w-full flex flex-col items-center text-center space-y-6 animate-fade-in">
        <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F5C] to-[#E94A92]">
        <FaExclamationTriangle className="text-destructive size-20"/>
        </h1>
        <p className="text-xl text-white/90">Oops! Something went wrong while logging in</p>
        <div className="relative w-40 h-40 my-4 animate-float">
       
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="100" cy="100" r="100" fill="#5D3891" fillOpacity="0.4" />
            <circle cx="100" cy="100" r="80" fill="#432B79" fillOpacity="0.6" />
            <circle cx="70" cy="70" r="10" fill="white" />
            <circle cx="130" cy="70" r="10" fill="white" />
            <path d="M70 140C70 140 100 110 130 140" stroke="white" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <Link href={"/login"} >
        <Button 
          className="bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white btn-social"
        >
          Return to Login
        </Button>
        </Link>
        
      </div>
    </div>
  );
};

export default LoginErrorPage;


