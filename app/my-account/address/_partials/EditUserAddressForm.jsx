import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import getURL from "@/middleware/getUrl";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@radix-ui/react-dialog";

const EditUserAddressForm = ({ addressInfo }) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const isAnyInputEmpty = () => {
    return [
      company,
      phone,
      addState,
      city,
      country,
      postalCode,
      street,
      isSetDefault,
    ].some((value) =>
      typeof value === "string" ? value.trim() === "" : !value,
    );
  };

  const [company, setCompany] = useState(addressInfo?.company?.company || "");
  const [phone, setPhone] = useState(addressInfo?.phone_number || "");
  const [addState, setAddState] = useState(addressInfo?.state || "");
  const [city, setCity] = useState(addressInfo?.city || "");
  const [country, setCountry] = useState(addressInfo?.country || "");
  const [postalCode, setSetPostal] = useState(addressInfo?.postal_code || "");
  const [street, setStreet] = useState(addressInfo?.street || "");
  const [isSetDefault, setIsSetDefault] = useState(
    addressInfo.set_default || "",
  );

  const submit = async () => {
    if (isAnyInputEmpty()) {
      // Display an error or handle the case where any input is empty
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        status: "error",
      });
      return;
    }
    const res = await fetch(
      getURL(`/api/v1/admin/shipping_address/${addressInfo.id}`),
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          phone,
          country,
          addState,
          city,
          postalCode,
          street,
          userId: session?.user?.id,
          companyId: addressInfo.companyId,
          isSetDefault,
        }),
      },
    );

    const body = await res.json();

    if (res.ok && body.message == "Successfully updated!") {
      toast({
        title: "Successfully updated!",
      });

      window.location.reload();
    }
  };

  return (
    <>
      <DialogHeader>
        <div className="flex justify-between items-center mt-8">
          <DialogTitle>
            <p>Edit Address</p>
          </DialogTitle>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="address"
              checked={isSetDefault}
              onCheckedChange={(e) => setIsSetDefault((prev) => (prev = !prev))}
            />
            <label
              htmlFor="address"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Set as Default Address
            </label>
          </div>
        </div>
      </DialogHeader>
      <div className="flex gap-3">
        <Input
          className="w-full"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Input
          className="col-span-2 w-full"
          placeholder="Phone"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="flex">
        <Input
          className="w-full"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="flex">
        <Input
          className="w-full"
          placeholder="State"
          value={addState}
          onChange={(e) => setAddState(e.target.value)}
        />
      </div>
      <div className="flex">
        <Input
          className="w-full"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="flex">
        <Input
          className="w-full"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setSetPostal(e.target.value)}
        />
      </div>
      <div className="flex">
        <Input
          className="w-full"
          placeholder="Street Name/ Building/ House No.: "
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <DialogFooter>
        <div className="flex w-full gap-3">
          <DialogClose asChild>
            <Button
              type="button"
              className="uppercase w-full"
              variant="ghost"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="uppercase w-full"
            onClick={submit}
            disabled={isAnyInputEmpty()}
          >
            Submit
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default EditUserAddressForm;
