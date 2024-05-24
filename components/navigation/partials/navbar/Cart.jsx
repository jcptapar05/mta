import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartLength = cartItems?.length;
  const [, setTotalPrice] = useState(0);
  useEffect(() => {
    let cartTotalPrice = 0;

    cartItems.forEach((item, index) => {
      const itemQuantity = item.orderDetails.quantity;
      const itemPrice = parseFloat(item.orderDetails.price);
      const itemTotalPrice = itemQuantity * itemPrice;
      cartTotalPrice += itemTotalPrice;
    });
    setTotalPrice(cartTotalPrice);
    localStorage.setItem("cartTotalPrice", cartTotalPrice);
  }, [cartItems]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none relative">
        <img
          src="/cart.svg"
          alt=""
          className="min-w-[20px] max-w-[20px]"
        />
        {cartLength ? (
          <p className="absolute -top-1 -right-1 rounded-full z-10 h-4 w-3 text-[10px] bg-red-500 text-white">
            {cartLength}
          </p>
        ) : (
          ""
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {cartLength <= 0 && <DropdownMenuItem>Cart is empty</DropdownMenuItem>}

        {cartLength > 0 && (
          <ul className="p-2 w-full">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="mb-1"
              >
                {item?.productToCart?.name}
              </li>
            ))}
            <Separator className="my-1 w-full"></Separator>
            <li>
              <Link
                href="/view_cart"
                className="text-blue-600 hover:text-blue-400 text-sm"
              >
                View Carts
              </Link>
            </li>
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;
