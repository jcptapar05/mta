"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import getURL from "@/middleware/getUrl";
const AddressInfo = ({
  next,
  prev,
  email,
  registerUser,
  mainSubmit,
  billingCompanyName,
  billingState,
  billingCity,
  billingCountry,
  billingPostalCode,
  billingAddressOne,
  billingAddressTwo,
  street,
  shippingCompanyName,
  shippingState,
  shippingCity,
  shippingCountry,
  shippingPostalCode,
  shippingAddressOne,
  shippingAddressTwo,
  billingPhoneNumber,
  shippingPhoneNumber,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      billingCompanyName,
      billingState,
      billingCity,
      billingCountry,
      billingPostalCode,
      billingAddressOne,
      billingAddressTwo,
      street,
      shippingCompanyName,
      shippingState,
      shippingCity,
      shippingCountry,
      shippingPostalCode,
      shippingAddressOne,
      shippingAddressTwo,
      billingPhoneNumber,
      shippingPhoneNumber,
    },
  });
  const [sameWithBilling, setSameWithBilling] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [termsIsChecked, setTermsIsChecked] = useState(false);
  const handleToggleAddress = (e) => {
    setSameWithBilling((prev) => (prev = !prev));
  };

  const onConfirm = async () => {
    registerUser();
    if (isChecked) {
      const response = await fetch(getURL("/api/v1/public/newsletter_mailer"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const dataMessage = await response?.json();

      if (response.ok) {
        toast({
          title: dataMessage.message,
        });

        reset();
      }
    }
  };

  const onSubmit = (data, e) => {
    mainSubmit(data);
  };

  return (
    <>
      <div className="text-center">
        <p className="uppercase">BILLING & SHIPPING INFORMATION</p>
      </div>
      <form
        className="my-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="mb-6">Billing Address</p>
        <div className="flex space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("billingCompanyName")}
                placeholder="Company Name"
              />
              {errors.billingCompanyName && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("billingCountry")}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("billingState")}
                placeholder="State"
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("billingPostalCode")}
                placeholder="Postal Code"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("billingCity")}
                placeholder="City"
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("billingPhoneNumber")}
                placeholder="Phone Number"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("street")}
                placeholder="Street"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 mb-6 flex flex-col md:flex-row md:gap-0 gap-4 justify-between items-start">
          <p>Shipping Address</p>
          <div className="flex items-center space-x-2">
            <input
              id="sameWithAddress"
              name="fruit"
              type="checkbox"
              value="sameWithBilling"
              onClick={handleToggleAddress}
              {...register("sameWithBilling")}
            />
            <Label htmlFor="sameWithAddress">Same as Billing Address</Label>
          </div>
        </div>
        {!sameWithBilling && (
          <>
            <div className="flex space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    {...register("shippingCompanyName")}
                    placeholder="Company Name"
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    {...register("shippingCountry")}
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    {...register("shippingState")}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    {...register("shippingPostalCode")}
                    placeholder="Postal Code"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    {...register("shippingCity")}
                    placeholder="City"
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    {...register("shippingPhoneNumber")}
                    placeholder="Phone Number"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    {...register("shippingAddressTwo")}
                    placeholder="Street"
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Checkbox
              id="terms-privacy"
              onClick={() => setTermsIsChecked(!termsIsChecked)}
            />
            <p>
              I have read and agree to the{" "}
              <Link
                href="/terms_and_conditions"
                className="text-[#2253FF]"
                target="_blank"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy_policy"
                target="_blank"
                className="text-[#2253FF]"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox
              id="mta-subscribe"
              onClick={() => setIsChecked(!isChecked)}
            />

            <p>
              I would like to receive marketing communications and promotional
              materials from My Top Arts.
            </p>
          </div>
        </div>
        <Separator className="bg-black my-10"></Separator>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            className="px-10 md:px-20"
            onClick={prev}
          >
            Prev
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className={`px-10 md:px-20`}
                type="submit"
                onClick={onSubmit}
                disabled={!termsIsChecked}
              >
                Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Allow MTA to collect data for improved user experience?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </>
  );
};

export default AddressInfo;
