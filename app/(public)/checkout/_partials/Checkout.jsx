"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";
import LoginDialog from "@/components/navigation/partials/navbar/LoginDialog";
import { useRouter } from "next/navigation";
import EditUserAddressForm from "@/app/my-account/address/_partials/EditUserAddressForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Checkout = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const cartItems = useCartStore((state) => state.cartItems);
  const cartId = useCartStore((state) => state.cartId);
  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const userId = session?.user.id;
  const [address, setAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [instructions, setInstructions] = useState("");
  const { toast } = useToast();

  const checkoutHandler = async (e) => {
    const total = localStorage.getItem("cartTotalPrice");

    const response = await fetch(getURL("/api/v1/public/orders"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        userId,
        addressId: address?.id,
        shippingAddressId: shippingAddress.id,
        instructions,
        cartTotalPrice: total,
        cartId,
      }),
    });

    const data = await response.json();

    if (response.ok && data.message == "Successfully Purchased!") {
      setInstructions((prev) => (prev = ""));
      // await fetch(getURL("/api/v1/public/on_order_mailer"), {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     first_name: session?.user?.first_name,
      //     email: session?.user?.email,
      //   }),
      // });

      toast({
        title: "Thank you!",
        description: "We will update you!",
      });

      addToCartItems([]);

      router.push("/my-account/orders/pending");
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetch(getURL(`/api/v1/public/address/${userId}`));
      const data = await response.json();
      // console.log(data.shippingAddress, "SHIPPING");
      setAddress(data.address);
      setShippingAddress(data.shippingAddress);
    };

    if (session) {
      fetchAddress();
    }
  }, [session, userId]);

  return (
    <div className="w-full flex-grow-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <p className="text-2xl">Check out</p>
          <p>Fill up the following details to place your order.</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[18px]">Shipping & Delivery</p>
          <p className="text-[#515151] text-sm">
            EST. DELIVERY BY: 1 - 2 WEEKS.
          </p>
          {session && (
            <div>
              {shippingAddress?.company != undefined &&
              shippingAddress?.company?.company != "" &&
              shippingAddress.address_1 != undefined &&
              shippingAddress.address_1 != "" ? (
                <div className="flex p-5 bg-[#F6F6F6] mt-4 items-center">
                  <div className="flex flex-col gap-4 w-full border-r-2 border-[#ABABAB]">
                    <div className="flex flex-col gap-1">
                      <p className="text-[12px]">Address</p>
                      <p className="text-sm font-semibold text-[#3E3E3E]">
                        {shippingAddress?.company?.company}
                      </p>
                      <p className="text-sm font-semibold text-[#3E3E3E]">
                        {shippingAddress?.address_1}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[12px]">Contact</p>
                      <p className="text-sm font-semibold text-[#3E3E3E]">
                        {shippingAddress?.user.first_name}{" "}
                        {shippingAddress?.user.last_name}
                      </p>
                      <p className="text-sm font-semibold text-[#3E3E3E]">
                        {shippingAddress?.phone_number}
                      </p>
                    </div>
                  </div>
                  <div className="w-[100px] flex justify-center items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost">Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <EditUserAddressForm
                          addressInfo={shippingAddress}
                        ></EditUserAddressForm>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-[#F6F6F6] mt-4 text-center">
                  <p>
                    You currently don't have a shipping address. Please add one
                    to proceed to checkout.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-[#2253FF]"
                      >
                        Add shipping address
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <EditUserAddressForm
                        addressInfo={shippingAddress}
                      ></EditUserAddressForm>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}
        </div>

        {session ? (
          <>
            {address && (
              <>
                <Button
                  disabled={
                    cartItems.length <= 0 ||
                    shippingAddress?.company == undefined ||
                    shippingAddress?.company?.company == "" ||
                    shippingAddress.address_1 == undefined ||
                    shippingAddress.address_1 == ""
                      ? true
                      : false
                  }
                  className="uppercase"
                  onClick={checkoutHandler}
                >
                  Place and SEND Order
                </Button>
              </>
            )}
            {!address && (
              // <Button className="uppercase">
              //   <Link href="/my-account/address">Update Address</Link>
              // </Button>
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <EditUserAddressForm
                      addressInfo={shippingAddress}
                    ></EditUserAddressForm>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </>
        ) : (
          <div className="w-full border text-center h-10 flex bg-black text-white hover:bg-opacity-75 flex-col items-center justify-center">
            <LoginDialog toggleName="Login to Continue Checkout"></LoginDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
