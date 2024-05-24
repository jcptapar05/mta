"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TotalItems from "./TotalItems";

const Total = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalOrderPrice = 0;
    const getTotalOrderPrice = () => {
      for (let i = 0; cartItems.length > i; i++) {
        const proPrice = cartItems[i].orderDetails.price;
        const proOrderQuantity = cartItems[i].orderDetails.quantity;
        const cur = proPrice * proOrderQuantity;

        totalOrderPrice += cur;
      }
    };

    getTotalOrderPrice();

    setTotalPrice(totalOrderPrice.toFixed(2));
  }, [cartItems]);

  return (
    <Card className="w-full md:w-6/12 border-0 rounded-none bg-[#F6F6F6]">
      <CardContent className="pt-8 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between">
            <p className="text-3xl">Total</p>
            <p className="text-2xl">$ {totalPrice}</p>
          </div>
          <Separator className="bg-black my-4"></Separator>
          <div>
            {cartItems && (
              <div>
                {cartItems?.map((item, index) => (
                  <TotalItems
                    key={index}
                    item={item}
                  ></TotalItems>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          className="w-full bg-transparent border-2"
          variant="outlinePrimary"
        >
          <Link
            href="/view_cart"
            className="w-full py-10"
          >
            Edit Purchase Order
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Total;
