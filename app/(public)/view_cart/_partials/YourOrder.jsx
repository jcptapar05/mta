/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { useCartStore } from "@/store/cartStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

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
import { Button } from "@/components/ui/button";

const YourOrder = () => {
  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const cartItems = useCartStore((state) => state.cartItems);

  const [cart, setCart] = useState(cartItems);

  const handleDeleteItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);

    addToCartItems(updatedCart);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].orderDetails.quantity =
      (updatedCart[index].orderDetails.quantity || 1) + 1;
    setCart(updatedCart);
    addToCartItems(updatedCart);
  };

  const handleIncreaseQuantityByInput = (numbr, index) => {
    let itemCount;

    if (numbr <= 0) {
      itemCount = 1;
    } else if (numbr >= 10000) {
      itemCount = 10000;
    } else {
      itemCount = numbr;
    }

    let updatedCart = [...cart];
    updatedCart[index].orderDetails.quantity = Number(itemCount);
    setCart(updatedCart);
    addToCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].orderDetails.quantity > 1) {
      updatedCart[index].orderDetails.quantity -= 1;
      setCart(updatedCart);
      addToCartItems(updatedCart);
    }
  };

  useEffect(() => {
    setCart(cartItems);
  }, [cart, cartItems]);

  return (
    <div className="w-full flex-grow-2">
      <div className="flex items-center gap-2">
        <AiOutlineShoppingCart size={30} />
        <div className="flex justify-between w-full">
          <p className="text-xl">My Orders</p>
          <p className="text-sm">{cart?.length} Items</p>
        </div>
      </div>
      <hr className="my-3 border-t-2 border-[#ABABAB]" />
      {cart?.length <= 0 && (
        <div className="text-center mt-20">
          <h2 className="text-4xl">Your cart is empty</h2>
        </div>
      )}

      <div>
        {cart.length >= 1 && (
          <ScrollArea className="h-[40vh] md:h-[60vh] hidden md:block w-full">
            {cart.map((item, index) => (
              <div
                key={index}
                className="pe-10"
              >
                <div className="flex gap-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button>
                        <GoTrash
                          size={34}
                          className="bg-[#F6F6F6] rounded-full p-2"
                        />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Remove this item from cart?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteItem(index)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <div className="flex w-full items-center max-w-[200px] max-h-[200px] h-[200px] bg-[#F6F6F6] ">
                    <img
                      src={getAwsFilesBaseUrl(item?.productToCart?.photo[0])}
                      alt=""
                      className="h-full w-full mx-auto object-contain p-4"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col w-full gap-3">
                      <h1 className="text-2xl">{item?.productToCart?.name}</h1>
                      <p className="text-base">
                        {item?.productToCart?.material?.name}
                      </p>
                      <div>
                        <p className="text-slate-400 text-sm">
                          Frame type:{" "}
                          <span className="text-black">
                            {item.orderDetails.frameCanvasThick}
                          </span>
                        </p>
                        <p className="text-slate-400 text-sm">
                          Frame size:{" "}
                          <span className="text-black">
                            {item.orderDetails.frameCanvasSize}
                          </span>
                        </p>
                        <p className="text-slate-400 text-sm">
                          Request sample:{" "}
                          <span className="text-black">
                            {item.requestSample == true ? "Yes" : "No"}
                          </span>
                        </p>
                        <p className="text-slate-400 text-sm">
                          Request 3D sample:{" "}
                          <span className="text-black">
                            {item.request3DSample == true ? "Yes" : "No"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="text-end pt-3">
                        x {item?.orderDetails.quantity}
                      </p>
                      <div className="flex space-x-2 items-center">
                        <button
                          onClick={() => handleDecreaseQuantity(index)}
                          disabled={item.orderDetails.quantity <= 1}
                          className="text-3xl bg-[#D9D9D9] h-[30px] w-[30px] rounded-full flex items-center justify-center"
                        >
                          <span className="mt-[-2px]">-</span>
                        </button>
                        <Input
                          className="w-[50px] text-center border-none bg-transparent focus-visible:ring-1 focus-within:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={item.orderDetails.quantity}
                          type="number"
                          min="1"
                          max="1000000"
                          onChange={(e) =>
                            handleIncreaseQuantityByInput(e.target.value, index)
                          }
                        />

                        <button
                          onClick={() => handleIncreaseQuantity(index)}
                          className="text-3xl bg-[#D9D9D9] h-[30px] w-[30px] rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            ))}
          </ScrollArea>
        )}
        {cart.length >= 1 && cart.length <= 3 ? (
          <div className="block md:hidden">
            {cart.map((item, index) => (
              <div
                key={index}
                className=" border-b-[1px] py-[0.9rem]"
              >
                <div className="flex gap-4 items-center h-[200px]">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button>
                        <GoTrash
                          size={34}
                          className="bg-[#F6F6F6] rounded-full p-2"
                        />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteItem(index)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <div className="flex w-full items-center h-full bg-[#F6F6F6] ">
                    <img
                      src={getAwsFilesBaseUrl(item?.productToCart?.photo[0])}
                      alt=""
                      className="h-full w-full mx-auto object-contain p-4"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-xl">{item?.productToCart?.name}</h1>
                      <p className="text-base">
                        {item?.productToCart?.material?.name}
                      </p>
                      <div>
                        <p className="text-slate-400 text-xs">
                          Frame type:{" "}
                          <span className="text-black">
                            {item.orderDetails.frameCanvasThick}
                          </span>
                        </p>
                        <p className="text-slate-400 text-xs">
                          Frame size:{" "}
                          <span className="text-black">
                            {item.orderDetails.frameCanvasSize}
                          </span>
                        </p>
                        <p className="text-slate-400 text-xs">
                          Request sample:{" "}
                          <span className="text-black">
                            {item.requestSample == true ? "Yes" : "No"}
                          </span>
                        </p>
                        <p className="text-slate-400 text-xs">
                          Request 3D sample:{" "}
                          <span className="text-black">
                            {item.request3DSample == true ? "Yes" : "No"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecreaseQuantity(index)}
                          disabled={item.orderDetails.quantity <= 1}
                          className="bg-[#D9D9D9] h-[20px] w-[20px] rounded-full flex items-center justify-center"
                        >
                          <span className="mt-[-2px] text-lg">-</span>
                        </button>
                        <Input
                          className="w-[50px] text-center border-none bg-transparent focus-visible:ring-1 focus-within:ring-0 outline-none"
                          value={item.orderDetails.quantity}
                          onChange={(e) =>
                            handleIncreaseQuantityByInput(e.target.value, index)
                          }
                        />

                        <button
                          onClick={() => handleIncreaseQuantity(index)}
                          className="bg-[#D9D9D9] h-[20px] w-[20px] rounded-full flex items-center text-lg justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-[60vh] md:h-[60vh] block md:hidden w-full">
            {cart.map((item, index) => (
              <div
                key={index}
                className=" border-b-[1px] py-[0.9rem]"
              >
                <div className="flex gap-4 items-center h-[200px]">
                  <button onClick={() => handleDeleteItem(index)}>
                    <GoTrash
                      size={34}
                      className="bg-[#F6F6F6] rounded-full p-2"
                    />
                  </button>
                  <div className="flex w-full items-center h-full bg-[#F6F6F6] ">
                    <img
                      src={getAwsFilesBaseUrl(item?.productToCart?.photo[0])}
                      alt=""
                      className="h-full w-full mx-auto object-contain p-4"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-xl">{item?.productToCart?.name}</h1>
                      <p className="text-base">
                        {item?.productToCart?.material?.name}
                      </p>
                      <div>
                        <p className="text-slate-400 text-xs">
                          Frame type:{" "}
                          <span className="text-black">
                            {item.orderDetails.frameCanvasThick}
                          </span>
                        </p>
                        <p className="text-slate-400 text-xs">
                          Frame size:{" "}
                          <span className="text-black">
                            {item.orderDetails.frameCanvasSize}
                          </span>
                        </p>
                        <p className="text-slate-400 text-xs">
                          Request sample:{" "}
                          <span className="text-black">
                            {item.requestSample == true ? "Yes" : "No"}
                          </span>
                        </p>
                        <p className="text-slate-400 text-xs">
                          Request 3D sample:{" "}
                          <span className="text-black">
                            {item.request3DSample == true ? "Yes" : "No"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecreaseQuantity(index)}
                          disabled={item.orderDetails.quantity <= 1}
                          className="bg-[#D9D9D9] h-[20px] w-[20px] rounded-full flex items-center justify-center"
                        >
                          <span className="mt-[-2px] text-lg">-</span>
                        </button>
                        <Input
                          className="w-[50px] text-center border-none bg-transparent focus-visible:ring-1 focus-within:ring-0 outline-none"
                          value={item.orderDetails.quantity}
                          onChange={(e) =>
                            handleIncreaseQuantityByInput(e.target.value, index)
                          }
                        />

                        <button
                          onClick={() => handleIncreaseQuantity(index)}
                          className="bg-[#D9D9D9] h-[20px] w-[20px] rounded-full flex items-center text-lg justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default YourOrder;
