"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PaymentInfo = ({ prev, mainSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();

    mainSubmit(data);
  };

  const [isAgree, setIsAgree] = useState(true);

  const handleOnIsAgree = () => {
    setIsAgree(!isAgree);
  };

  return (
    <>
      <div className="text-center">
        <p className="uppercase">BUSINESS & TAX CREDENTIALS</p>
      </div>
      <form
        className="my-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex space-x-8 mb-5">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <p className="mb-2">Business Registration License</p>
              <Input {...register("businessRegistrationLincense")} />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <p className="mb-2">Tax Resale Certificate</p>
              <Input {...register("taxResaleCertificate")} />
            </div>
          </div>
        </div>
        <div className="flex space-x-8 mb-5">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <p className="mb-2">Credit Sheet Report</p>
              <Input {...register("creditSheetReport")} />
            </div>
          </div>
          <div className="grid w-full items-center mb-3"></div>
        </div>
        <div className="flex space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <p className="mb-2">No Business Registration License?</p>
              <Input
                {...register("noBusinessRegistrationLicenceExplaination")}
                placeholder="Provide explanation *"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <p className="mb-2">No Tax Resale Certificate?</p>
              <Input
                {...register("noTaxResaleCertificateExplaination")}
                placeholder="Provide explanation *"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-8 mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAgreeCheckBox"
              onClick={handleOnIsAgree}
            />
            <Label htmlFor="isAgreeCheckBox">Accept terms and conditions</Label>
          </div>
        </div>

        <Separator className="bg-black my-10"></Separator>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            className="px-20"
            onClick={prev}
          >
            Prev
          </Button>
          <Button
            className="px-20"
            type="submit"
            disabled={isAgree}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentInfo;
