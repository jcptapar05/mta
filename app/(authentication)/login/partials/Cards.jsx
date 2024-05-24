"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { manrope } from "@/app/fonts";
import { Label } from "@/components/ui/label";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/users";
import getURL from "@/middleware/getUrl";

const Cards = ({ handleDialogClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const user = useUserStore((state) => state.user);

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

    // if (response.ok && !response.error) {
    //   router.replace("/my-account/dashboard")
    //   //  location.reload();
    // }

    setLoginStatus(false);

    // if (response.ok) {
    //   window.location.reload();
    // }
  };

  return (
    <div className="flex flex-col">
      <Card className="max-w-[450px] border-0 shadow-none">
        <CardHeader className="text-center mb-4">
          <CardTitle className={`${manrope.className} font-medium text-3xl`}>
            Login to your Account
          </CardTitle>
          {/* <CardDescription>If you are a registered user with us, please log in below</CardDescription> */}
        </CardHeader>
        <CardContent>
          {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}
          <form
            onSubmit={submit}
            noValidate
          >
            <div className="grid w-full items-center mb-3">
              <div className="flex flex-col space-y-1.5">
                <div className="mb-2 text-start">
                  <Label>
                    Email Address <span className="text-red-600">*</span>
                  </Label>
                </div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
            <div className="grid w-full items-center mb-3 mt-10">
              <div className="flex flex-col space-y-1.5">
                <div className="mb-2 text-start">
                  <Label>
                    Password <span className="text-red-600 mb-20 pb-20">*</span>
                  </Label>
                </div>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>
            <div className="text-end">
              <Link
                className="my-10"
                href="/forgot_password"
                onClick={handleDialogClose}
              >
                Forgot password?
              </Link>
            </div>
            {!loginStatus && (
              <Button
                disabled={email === "" || password === ""}
                className="w-full mt-5"
              >
                Login
              </Button>
            )}
            {loginStatus && (
              <Button
                disabled
                className="w-full mt-5"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}

            <div className="text-center mt-7">
              <p>
                Don't have an account?
                <Link
                  href="/register"
                  className="ms-2 font-medium underline"
                  onClick={handleDialogClose}
                >
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* <Card className="max-w-[450px] border-0 shadow-none">
        <CardHeader>
          <CardTitle>CREATE A NEW ACCOUNT</CardTitle>
          <CardDescription>Are you a new customer? Create an account today and start exploring My Top Ars</CardDescription>
          <CardDescription className="font-bold">Shop online, View pricing, ability to add to favourites and build projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/register"
            className="bg-primary text-white rounded-md py-2 hover:bg-primary/90 px-20"
          >
            Register
          </Link>
          <Separator className="border-b-2 mt-14 border-black" />
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Cards;
