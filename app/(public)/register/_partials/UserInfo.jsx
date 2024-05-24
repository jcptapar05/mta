"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import getURL from "@/middleware/getUrl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UserInfo = ({
  next,
  nextAddressInfo,
  firstName,
  lastName,
  jobTitle,
  businessType,
  websiteUrl,
  email,
  confirmEmail,
  password,
  confirmPassword,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      jobTitle: jobTitle,
      businessType: businessType,
      websiteUrl: websiteUrl,
      email: email,
      confirmEmail: confirmEmail,
      password: password,
      confirmPassword: confirmPassword,
    },
  });

  const [emailIsExist, setEmailIsExist] = useState();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const response = await fetch(getURL("/api/v1/public/emailchecker"), {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
    });

    const checkUserEmailIfExists = await response.json();

    // console.log(checkUserEmailIfExists);
    setEmailIsExist(checkUserEmailIfExists.message);

    if (checkUserEmailIfExists.message == "ok") {
      nextAddressInfo(data);
      next();
    }
  };

  return (
    <>
      <div className="text-center">
        <p className="uppercase">User Information</p>
      </div>
      <form
        className="my-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="mb-6">Personal Details</p>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z\s]+$/,
                })}
                placeholder="First Name *"
                type="text"
              />
              {errors.firstName?.type === "required" && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              {errors.firstName?.type === "pattern" && (
                <span className="text-red-500 text-xs">
                  Only letters are allowed in this field
                </span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("lastName", {
                  required: true,
                  pattern: /^[A-Za-z\s]+$/,
                })}
                placeholder="Last Name *"
                type="textt"
              />
              {errors.lastName?.type === "required" && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              {errors.lastName?.type === "pattern" && (
                <span className="text-red-500 text-xs">
                  Only letters are allowed in this field
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("jobTitle")}
                placeholder="Job Title"
              />
              {errors.jobTitle?.type === "required" && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              {errors.jobTitle?.type === "pattern" && (
                <span className="text-red-500 text-xs">
                  Only letters are allowed in this field
                </span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("businessType")}
                placeholder="Business Type"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("websiteUrl")}
                placeholder="Website URL"
              />
            </div>
          </div>
        </div>
        <p className="mt-12 mb-6">Login Details</p>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("email", { required: true })}
                placeholder="Email *"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              {emailIsExist == "Email is already exist!" && (
                <span className="text-red-500 text-xs">{emailIsExist}</span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("confirmEmail", {
                  required: true,
                  validate: (value) =>
                    value === watch("email") || "Email does not match",
                })}
                placeholder="Confirm Email *"
                type="email"
              />
              {errors.confirmEmail && (
                <p className="flex flex-col gap-y-1">
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                  <span className="text-red-500 text-xs">Email not match</span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("password", { required: true, minLength: 8 })}
                placeholder="Password *"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.type === "required"
                    ? "This field is required"
                    : "Password must be 8 characters and above"}
                </span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                  validate: (value) =>
                    value === watch("password") || "Password does not match",
                })}
                placeholder="Confirm Password *"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.type === "required"
                    ? "This field is required"
                    : errors.confirmPassword.type === "minLength"
                    ? "Password must be 8 characters and above"
                    : "Passwords do not match"}
                </span>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-black my-10"></Separator>

        <div className="text-end">
          <Button
            type="submit"
            className="px-20"
          >
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserInfo;
