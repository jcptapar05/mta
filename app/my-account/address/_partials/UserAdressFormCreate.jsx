"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import getURL from "@/middleware/getUrl";
import { manrope } from "@/app/fonts";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

const UserAdressFormCreate = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [billingCompanyName, setBillingCompanyName] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [billingAddressOne, setBillingAddressOne] = useState("");
  const [billingAddressTwo, setBillingAddressTwo] = useState("");
  const [billingPhoneNumber, setBillingPhoneNumber] = useState("");
  const [shippingCompanyName, setShippingCompanyName] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingAddressOne, setShippingAddressOne] = useState("");
  const [shippingAddressTwo, setShippingAddressTwo] = useState("");
  const [shippingPhoneNumber, setShippingPhoneNumber] = useState("");

  const [toggleShippingAddress, setToggleShippingAddress] = useState(false);

  const handleToggleAddress = () => {
    setToggleShippingAddress(!toggleShippingAddress);
  };

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(getURL(`/api/v1/admin/address`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        billingCompanyName,
        billingCity,
        billingState,
        billingCountry,
        billingPostalCode,
        billingAddressOne,
        billingAddressTwo,
        billingPhoneNumber,
        shippingCompanyName,
        shippingCity,
        shippingState,
        shippingCountry,
        shippingPostalCode,
        shippingAddressOne,
        shippingAddressTwo,
        shippingPhoneNumber,
        userId,
        toggleShippingAddress,
      }),
    });

    // await res.json();

    // if (res.ok) {
    //   router.push("/admin/profile")
    // }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-5 flex justify-between items-end">
        <div>
          <h2 className={`text-2xl mb-2 ${manrope.className}`}>
            Shipping & Billing Address
          </h2>
          <p>Manage and edit your address for delivery purposes</p>
        </div>

        <div>
          <Button
            type="button"
            variant="outlinePrimary"
            onClick={submit}
          >
            Save
          </Button>
        </div>
      </div>

      <Separator className="mb-8"></Separator>

      <form>
        <p className="mb-4">Billing Address</p>
        <div className="md:flex md:space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Company"
                className="py-6 border-0 bg-slate-100"
                value={billingCompanyName}
                onChange={(e) => setBillingCompanyName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Country"
                className="py-6 border-0 bg-slate-100"
                value={billingCountry}
                onChange={(e) => setBillingCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="State"
                className="py-6 border-0 bg-slate-100"
                value={billingState}
                onChange={(e) => setBillingState(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:flex md:space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Postal Code"
                className="py-6 border-0 bg-slate-100"
                value={billingPostalCode}
                onChange={(e) => setBillingPostalCode(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="City"
                className="py-6 border-0 bg-slate-100"
                value={billingCity}
                onChange={(e) => setBillingCity(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Phone"
                className="py-6 border-0 bg-slate-100"
                value={billingPhoneNumber}
                onChange={(e) => setBillingPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:flex md:space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Address 1"
                className="py-6 border-0 bg-slate-100"
                value={billingAddressOne}
                onChange={(e) => setBillingAddressOne(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:flex md:space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Address 2"
                className="py-6 border-0 bg-slate-100"
                value={billingAddressTwo}
                onChange={(e) => setBillingAddressTwo(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 mb-4 flex justify-between items-center">
          <p>Shipping Address</p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              onClick={handleToggleAddress}
            />
            <Label htmlFor="terms">Same as Billing Address</Label>
          </div>
        </div>

        {!toggleShippingAddress && (
          <>
            <div className="md:flex md:space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Company"
                    className="py-6 border-0 bg-slate-100"
                    value={shippingCompanyName}
                    onChange={(e) => setShippingCompanyName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Country"
                    className="py-6 border-0 bg-slate-100"
                    value={shippingCountry}
                    onChange={(e) => setShippingCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="State"
                    className="py-6 border-0 bg-slate-100"
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:flex md:space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Postal Code"
                    className="py-6 border-0 bg-slate-100"
                    value={shippingPostalCode}
                    onChange={(e) => setShippingPostalCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="City"
                    className="py-6 border-0 bg-slate-100"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Phone"
                    className="py-6 border-0 bg-slate-100"
                    value={shippingPhoneNumber}
                    onChange={(e) => setShippingPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:flex md:space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Address 1"
                    className="py-6 border-0 bg-slate-100"
                    value={shippingAddressOne}
                    onChange={(e) => setShippingAddressOne(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:flex md:space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Address 2"
                    className="py-6 border-0 bg-slate-100"
                    value={shippingAddressTwo}
                    onChange={(e) => setShippingAddressTwo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UserAdressFormCreate;
