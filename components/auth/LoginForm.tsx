
"use client";


import React from 'react';
import { Card } from '@/components/ui/card';
import LoginShapes from './LoginShapes';
import WelcomeIllustration from './WelcomeIllustration';
import SocialButton from './SocialButton';
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { FormError } from "../form-error";


const LoginForm  = () => {

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider"
      : "";
      const callbackUrl = searchParams.get("callbackUrl");
  const handleSocialLogin = (provider: string) => {
    signIn(provider, {
            callbackUrl: callbackUrl || "/",
          });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-login-gradient flex items-center justify-center px-4 py-10">
      <LoginShapes />
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 z-10 w-full max-w-6xl mx-auto">
        {/* Left Card - Welcome Section */}
        <Card className="w-full max-w-md login-card p-8 animate-fade-in-left">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-coral-500 font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF7F5C] to-[#E94A92] animate-pulse-soft">
              welcome back!
            </h2>
            
            <p className="text-white/90 text-xl">
              This place hasn&apos;t been the same without you.
            </p>
            
            <WelcomeIllustration />
          </div>
        </Card>
        
        {/* Right Card - Login Section */}
        <Card className="w-full max-w-md login-card p-8 animate-fade-in-right">
          <div className="flex flex-col space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white animate-fade-in">sign in</h1>
              <p className="text-white/70">Choose your preferred login method</p>
            </div>
            
            <div className="space-y-4">
              <SocialButton 
                provider="google" 
                onClick={() => handleSocialLogin("google")}
                className="animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              />
              
              <SocialButton 
                provider="github" 
                onClick={() => handleSocialLogin("github")}
                className="animate-fade-in"
                style={{ animationDelay: '0.4s' }}
              />
            </div>
             {/* Display Error if any */}
         {urlError && <FormError message={urlError} />}
            
          </div>
        </Card>
      </div>
      
      {/* Animated wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto animate-wave"
        >
          <path 
            d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 58.7C672 69.3 768 90.7 864 90.7C960 90.7 1056 69.3 1152 56C1248 42.7 1344 37.3 1392 34.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V80Z" 
            fill="rgba(255, 255, 255, 0.1)"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoginForm 


// import { useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
// import { signIn } from "next-auth/react";
// import { FormError } from "../form-error";

// export const LoginForm = () => {
//   const searchParams = useSearchParams();
//   const urlError =
//     searchParams.get("error") === "OAuthAccountNotLinked"
//       ? "Email already in use with a different provider"
//       : "";

//   const callbackUrl = searchParams.get("callbackUrl");
//   const onClick = (provider: string) => {
//     signIn(provider, {
//       callbackUrl: callbackUrl || "/",
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 via-blue-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <Card className="w-full max-w-md shadow-2xl rounded-lg overflow-hidden">
//         <CardHeader className="bg-white dark:bg-gray-800 text-center py-6">
//           <CardTitle className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
//             Welcome Back!
//           </CardTitle>
//           <CardDescription className="text-gray-600 dark:text-gray-400">
//             Sign in to continue
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="bg-white dark:bg-gray-800 px-6 py-8">
//           {/* Google Login Button */}
//           <Button
//             size="lg"
//             className="w-full flex items-center justify-center bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
//             onClick={() => onClick("google")}
//           >
//             <FcGoogle className="mr-3 h-6 w-6" />
//             Continue with Google
//           </Button>

//           {/* Display Error if any */}
//           {urlError && <FormError message={urlError} />}

//           {/* GitHub Login Button */}
//           <Button
//             size="lg"
//             className="w-full mt-4 flex items-center justify-center bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
//             onClick={() => onClick("github")}
//           >
//             <FaGithub className="mr-3 h-6 w-6" />
//             Continue with GitHub
//           </Button>
//         </CardContent>
//         <CardFooter className="bg-white dark:bg-gray-800 px-6 py-4">
//           <div className="text-sm text-center text-gray-500 dark:text-gray-400">
//             By logging in, you agree to our{" "}
//             <a
//               href="/terms"
//               className="underline hover:text-gray-800 dark:hover:text-gray-200"
//             >
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a
//               href="/privacy"
//               className="underline hover:text-gray-800 dark:hover:text-gray-200"
//             >
//               Privacy Policy
//             </a>
//             .
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };
