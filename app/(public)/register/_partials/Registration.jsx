"use client";
import Cards from "@/app/(authentication)/login/partials/Cards";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { PiPresentationThin, PiUserCircleLight } from "react-icons/pi";
import StepperComponent from "./StepperComponent";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Registration = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  const queryParams = new URLSearchParams(window.location.search);
  const shouldOpenDialog = queryParams.get("open") === "true";

  const [open, setOpen] = useState(shouldOpenDialog);

  const [role, setRole] = useState(null);

  const selectRoleButton = (item) => {
    if (item === "artist") {
      setRole(4);
    } else {
      setRole(3);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div className="container md:px-8 px-5 mx-auto">
      {!role && (
        <div>
          <div className="text-center">
            <h4 className="text-xl mb-4">CREATE NEW ACCOUNT</h4>
            <Separator></Separator>
          </div>
          <div className="text-center my-14">
            <p className="capitalize text-2xl mb-2">Who Are You?</p>
            <p>Choose what's your role on our platform</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-16 mt-20">
            <div className="w-full md:w-1/2 grid content-center border-4 hover:border-black">
              <button
                className="text-center p-10 md:p-20"
                onClick={() => selectRoleButton("customer")}
              >
                <PiUserCircleLight className="mx-auto text-9xl" />
                <p className="text-2xl md:text-5xl font-extralight">Customer</p>
                <p>
                  Discover, collect, and bring art into your life as a valued
                  art enthusiast.
                </p>
              </button>
            </div>
            <div className="w-full md:w-1/2 grid content-center border-4 hover:border-black">
              <button
                className="text-center p-10 md:p-20"
                onClick={() => selectRoleButton("artist")}
              >
                <PiPresentationThin className="mx-auto text-9xl" />
                <p className="text-2xl md:text-5xl font-extralight">Artist</p>
                <p>
                  Discover, collect, and bring art into your life as a valued
                  art enthusiast.
                </p>
              </button>
            </div>
          </div>
          <Separator className="mt-14 mb-5"></Separator>
          <p className="text-center">
            Already have an account? {"  "}
            <Dialog
              open={open}
              onOpenChange={setOpen}
            >
              <DialogTrigger className="underline">Login</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <Cards handleDialogClose={handleDialogClose}></Cards>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </p>
        </div>
      )}
      {role && <StepperComponent role={role}></StepperComponent>}
    </div>
  );
};

export default Registration;
