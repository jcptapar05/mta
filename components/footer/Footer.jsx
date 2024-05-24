/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import SubFooter from "./SubFooter";
import getURL from "@/middleware/getUrl";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

const Footer = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const response = await fetch(getURL("/api/v1/public/newsletter_mailer"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });
    const dataMessage = await response?.json();

    if (response.ok) {
      toast({
        title: dataMessage.message,
      });

      reset();
    }
  };

  return (
    <div className="w-full flex items-center flex-col pt-20 pb-6 bg-black text-white">
      <div className="w-[90%] md:w-[80%] lg:w-[70%]">
        <div className="flex flex-col w-full gap-10 items-center md:flex-row justify-between mb-16">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h3 className="text-[32px] md:text-[40px] md:text-4xl text-center">
              Be the First to Know:
            </h3>
            <h3 className="text-[32px] md:text-[40px] md:text-4xl text-center">
              Join Our Newsletter Today
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="w-full md:w-1/2 flex md:justify-end"
          >
            <div className="flex flex-col w-full md:w-[70%]">
              <div className="flex items-center justify-center flex-col md:flex-row gap-3">
                <Input
                  className=" w-full bg-transparent text-[14px] py-5 placeholder:text-gray-[#656565]"
                  placeholder="Enter Email Address*"
                  type="email"
                  {...register("email", {
                    required: true,
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 ||
                        "The email should have at most 50 characters",
                      matchPattern: (v) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "Email address must be a valid address",
                    },
                  })}
                />
                <Button
                  className="uppercase md:w-fit w-full bg-white rounded-none h-fit text-black py-[10px] font-bold md:text-[14px] hover:bg-white hover:bg-opacity-80"
                  type="submit"
                >
                  Send
                </Button>
              </div>
              <p className="text-[12px] mt-2">
                *By clicking “SEND” you agree to subscribe to our newsletter in
                accordance to our{" "}
                <Link
                  href="/privacy_policy"
                  className="underline"
                >
                  privacy policy
                </Link>
                .
              </p>
              {errors.email && (
                <p className="text-red-600">
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </form>
        </div>
        <div className="w-full">
          <Separator className="mb-6 w-full"></Separator>
          <SubFooter></SubFooter>
        </div>
      </div>
    </div>
  );
};

export default Footer;
