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
import { DialogClose } from "@radix-ui/react-dialog";

const CreateUserAddressForm = ({ addressInfo }) => {
  const { toast } = useToast();
  const { data: session } = useSession();

  const [company, setCompany] = useState(addressInfo?.company?.company || "");
  const [phone, setPhone] = useState(addressInfo?.phone_number || "");
  const [addState, setAddState] = useState(addressInfo?.state || "");
  const [city, setCity] = useState(addressInfo?.city || "");
  const [country, setCountry] = useState(addressInfo?.country || "");
  const [postalCode, setSetPostal] = useState(addressInfo?.postal_code || "");
  const [street, setStreet] = useState(addressInfo?.street || "");

  const isAnyInputEmpty = () => {
    return [company, phone, addState, city, country, postalCode, street].some(
      (value) => value.trim() === "",
    );
  };

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
    const res = await fetch(getURL(`/api/v1/admin/shipping_address`), {
      method: "POST",
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
      }),
    });

    const body = await res.json();

    if (res.ok && body.message == "Successfully created!") {
      // router.push("/admin/profile");

      toast({
        title: body.message,
      });

      window.location.reload();
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <p>Create Address</p>
        </DialogTitle>
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

export default CreateUserAddressForm;
