"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import getURL from "@/middleware/getUrl";
import { manrope } from "@/app/fonts";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const UserInfoForm = ({ address, userId }) => {
  const { toast } = useToast();
  const [billingCompanyName, setbillingCompanyName] = useState(
    address?.company?.company || "",
  );
  const [billingCity, setBillingCity] = useState(address?.city || "");
  const [billingState, setBillingState] = useState(address?.state || "");
  const [billingCountry, setBillingCountry] = useState(address?.country || "");
  const [billingPostalCode, setBillingPostalCode] = useState(
    address?.postal_code || "",
  );
  const [billingAddressOne, setBillingAddressOne] = useState(
    address?.address_1 || "",
  );
  const [billingAddressTwo, setBillingAddressTwo] = useState(
    address?.address_2 || "",
  );
  const [billingPhoneNumber, setBillingAddressPhoneNumber] = useState(
    address?.phone_number || "",
  );
  const [shippingCompanyName, setShippingCompanyName] = useState(
    address?.shippingAddress[0]?.company?.company || "",
  );
  const [shippingCity, setShippingCity] = useState(
    address?.shippingAddress[0]?.city || "",
  );
  const [shippingState, setShippingState] = useState(
    address?.shippingAddress[0]?.state || "",
  );
  const [shippingCountry, setShippingCountry] = useState(
    address?.shippingAddress[0]?.country || "",
  );
  const [shippingPostalCode, setShippingPostalCode] = useState(
    address?.shippingAddress[0]?.postal_code || "",
  );
  const [shippingAddressOne, setShippingAddressOne] = useState(
    address?.shippingAddress[0]?.address_1 || "",
  );
  const [shippingAddressTwo, setShippingAddressTwo] = useState(
    address?.shippingAddress[0]?.address_2 || "",
  );
  const [shippingPhoneNumber, setShippingAddressPhoneNumber] = useState(
    address?.shippingAddress[0]?.phone_number || "",
  );

  const [toggleEdit, setToggleEdit] = useState(true);

  const toggleEditHandler = () => {
    setToggleEdit(false);
  };

  const toggleCancelHandler = () => {
    setToggleEdit(true);
  };

  const [toggleShippingAddress, setToggleShippingAddress] = useState(false);

  const handleToggleAddress = () => {
    setToggleShippingAddress(!toggleShippingAddress);
  };

  const submit = async () => {
    const res = await fetch(getURL(`/api/v1/admin/address/${userId}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        billingCompanyId: address?.company?.id,
        billingCompanyName,
        billingCity,
        billingState,
        billingCountry,
        billingPostalCode,
        billingAddressOne,
        billingAddressTwo,
        billingPhoneNumber,
        shippingCompanyName,
        shippingId: address?.shippingAddress[0]?.company?.id,
        shippingCity,
        shippingState,
        shippingCountry,
        shippingPostalCode,
        shippingAddressOne,
        shippingAddressTwo,
        shippingPhoneNumber,
        userId,
        toggleShippingAddress,
        addressId: address?.id,
        shippingAddressid: address?.shippingAddress[0]?.id,
      }),
    });

    const body = await res.json();

    if (res.ok && body.message == "Successfully updated!") {
      // router.push("/admin/profile");

      toast({
        title: "Successfully updated!",
      });
      window.location.reload();
    }
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
          {toggleEdit && (
            <Button
              type="button"
              variant="outlinePrimary"
              onClick={() => toggleEditHandler()}
            >
              Edit
            </Button>
          )}
          {!toggleEdit && (
            <>
              <Button
                className="me-4"
                type="button"
                variant="outlinePrimary"
                onClick={() => toggleCancelHandler()}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => submit()}
              >
                Update
              </Button>
            </>
          )}
        </div>
      </div>

      <Separator className="mb-8"></Separator>

      <form onSubmit={submit}>
        <p className="mb-4">Billing Address</p>
        <div className="md:flex md:space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Company"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
                value={billingCompanyName}
                onChange={(e) => setbillingCompanyName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Country"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
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
                disabled={toggleEdit}
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
                disabled={toggleEdit}
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
                disabled={toggleEdit}
                value={billingCity}
                onChange={(e) => setBillingCity(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Phone"
                type="number"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
                value={billingPhoneNumber}
                onChange={(e) => setBillingAddressPhoneNumber(e.target.value)}
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
                disabled={toggleEdit}
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
                disabled={toggleEdit}
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
              disabled={toggleEdit}
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
                    disabled={toggleEdit}
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
                    disabled={toggleEdit}
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
                    disabled={toggleEdit}
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
                    disabled={toggleEdit}
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
                    disabled={toggleEdit}
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Phone"
                    type="number"
                    className="py-6 border-0 bg-slate-100"
                    disabled={toggleEdit}
                    value={shippingPhoneNumber}
                    onChange={(e) =>
                      setShippingAddressPhoneNumber(e.target.value)
                    }
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
                    disabled={toggleEdit}
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
                    disabled={toggleEdit}
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

export default UserInfoForm;
