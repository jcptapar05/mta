"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

const OrderSummary = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalOrderPrice = 0;
    const getTotalOrderPrice = () => {
      for (let i = 0; cartItems?.length > i; i++) {
        const proPrice = cartItems[i]?.orderDetails?.price;
        const proOrderQuantity = cartItems[i]?.orderDetails?.quantity;
        const cur = proPrice * proOrderQuantity;
        totalOrderPrice += cur;
      }
    };

    getTotalOrderPrice();

    setTotalPrice(totalOrderPrice.toFixed(2));
  }, [cartItems, totalPrice]);

  return (
    <div className="flex-shrink-0 h-fit bg-[#F6F6F6] w-full md:w-5/12 p-4">
      <div className="">
        <div className="flex justify-between">
          <p className="text-xl">Order Total</p>
          <p className="text-xl">$ {totalPrice}</p>
        </div>
        <Button
          className="w-full mt-6"
          disabled={cartItems.length == 0 ? true : false}
        >
          <Link
            href="/checkout"
            className="w-full py-10 uppercase"
          >
            Checkout
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
