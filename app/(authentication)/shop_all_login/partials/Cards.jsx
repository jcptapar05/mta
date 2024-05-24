"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { FaFacebookF, FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Cards = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loginStatus, setLoginStatus] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");

 const router = useRouter();

 const submit = async (e) => {
  e.preventDefault();
  setLoginStatus(true);

  if (!email || !password) setErrorMessage("User or Password is required!");

  const response = await signIn("credentials", {
   email,
   password,
   redirect: false,
  });

  if (response.error) {
   setErrorMessage("User or Password is incorrect!");
  }

  if (response.ok && !response.error) {
   router.replace("/admin/dashboard");
   //  location.reload();
  }

  setLoginStatus(false);
 };

 return (
  <Card className="max-w-[450px] border-0 shadow-none">
   <CardHeader className="text-center">
    <CardTitle>Welcome back</CardTitle>
   </CardHeader>
   <CardContent>
    <Button className="mb-3 w-full">
     <FaApple className="mr-4" />
     Login with Apple
    </Button>

    <Button
     variant="secondary"
     className="mb-3 w-full border-2"
    >
     <FcGoogle className="mr-4" /> Login with Google
    </Button>

    <Button className="mb-3 w-full bg-blue-900 hover:bg-blue-800">
     <FaFacebookF className="mr-4" /> Login with Facebook
    </Button>

    <div className="text-center mt-5 mb-8">
     <p>Or, sign in with your email</p>
    </div>
    {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}
    <form
     onSubmit={submit}
     noValidate
    >
     <div className="grid w-full items-center mb-3">
      <div className="flex flex-col space-y-1.5">
       <Input
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
       />
      </div>
     </div>
     <div className="grid w-full items-center mb-3">
      <div className="flex flex-col space-y-1.5">
       <Input
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
       />
      </div>
     </div>
     {!loginStatus && (
      <Button
       disabled={email === "" || password === ""}
       className="px-20 w-full"
      >
       Login
      </Button>
     )}
     {loginStatus && (
      <Button disabled>
       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
       Please wait
      </Button>
     )}
    </form>
   </CardContent>
  </Card>
 );
};

export default Cards;
