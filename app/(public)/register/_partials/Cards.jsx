"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegPenToSquare } from "react-icons/fa6";
import Forms from "./Forms";

const Cards = () => {
  return (
    <>
      <Card className="border-0 shadow-none w-screen">
        <CardHeader className="text-center">
          <CardTitle className="mb-6 font-extrabold">
            REGISTER A NEW ACCOUNT
          </CardTitle>
          <FaRegPenToSquare
            className="mx-auto"
            size={50}
          />
          <CardDescription className="font-bold">
            LOGIN INFORMATION
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Forms />
        </CardContent>
      </Card>
    </>
  );
};

export default Cards;
