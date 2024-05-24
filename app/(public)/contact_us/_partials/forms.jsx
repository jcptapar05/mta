"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import getURL from "@/middleware/getUrl";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

const Forms = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const response = await fetch(getURL("/api/v1/public/contact_us_mailer"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, message: data.message }),
    });

    const dataMessage = await response.json();

    if (response.ok) {
      reset();

      toast({
        title: dataMessage.message,
      });
    }
  };

  return (
    <div className="w-full md:w-7/12 py-20">
      <div className="md:max-w-[500px] mx-auto">
        <p className="text-2xl mb-3">Contact Info</p>
        <p className="mb-8">
          To send us your questions or comments, Please use the following online
          contact form.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="max-w-[600px]"
        >
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Email *"
                className="bg-gray-50 py-6 text-lg"
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
            </div>
          </div>

          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Textarea
                rows="4"
                placeholder="Message..."
                className="resize-none bg-gray-50 rounded-none text-lg"
                {...register("message", {
                  required: true,
                })}
              />
            </div>
          </div>

          {errors.email && (
            <p className="text-red-600 mb-2">
              Please enter a valid email address.
            </p>
          )}
          {errors.message && (
            <p className="text-red-600 mb-2">Please enter your message!.</p>
          )}

          <div className="text-end">
            <Button
              className="w-full py-6 uppercase"
              type="submit"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forms;
