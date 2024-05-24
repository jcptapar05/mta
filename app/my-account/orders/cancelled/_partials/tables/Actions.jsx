/* eslint-disable @next/next/no-img-element */
"use client";

import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { manrope } from "@/app/fonts";
import ToggleStatusAction from "./ToggleStatusAction";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import Moment from "react-moment";
import Forms from "./forms";

const Actions = ({ item }) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const deleteRole = async (id) => {
    const res = await fetch(getURL(`/api/v1/admin/roles/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 0,
      },
    });
    const data = await res.json();

    return data;
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <FaPencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[900px]">
          <ScrollArea className="h-[85vh] pe-4">
            <p className="uppercase">nbpo details</p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
                <p>Order number</p>
                <p>{item.id}</p>
              </div>
              <div className="md:w-1/4">
                <p>Status</p>
                <p
                  className={`uppercase ${
                    item.order?.status == "cancelled" && "text-red-600"
                  } ${item.order?.status == "pending" && "text-orange-400"} ${
                    item.order?.status == "completed" && "text-green-600"
                  }`}
                >
                  {item.order?.status}
                </p>
              </div>
              <div className="w-1/4">
                <p>Initial Price</p>
                <p>$ {item?.order?.cartTotalPrice}</p>
              </div>
              <div className="w-1/4">
                <p>Date added</p>
                <Moment format="MMM D, YYYY">{item.created_at}</Moment>
              </div>
            </div>

            <Separator className="my-4 bg-[#C8C8C8]" />

            {userRole == "customer" && (
              <div className="md:flex">
                <div>
                  <p className="font-bold text-sm">Contact Person</p>
                  <p className="font-bold">Abegail Lackson</p>
                  <p className="mb-1">Regional Sales Representative</p>
                  <p>
                    Teritory: Northeast Region (New York, New Jersey,
                    Connecticut)
                  </p>
                </div>
                <div>
                  <p className="font-bold text-sm">Contact Details</p>
                  <p className="font-bold">Abegaillackson@1cd.com</p>
                  <p>807-321-4476</p>
                </div>
              </div>
            )}

            {(userRole == "super_admin" || userRole == "admin") && (
              <div className="md:flex">
                <div className="w-full md:w-1/2">
                  <p className="font-semibold">Client name</p>
                  <p className="capitalize font-semibold">
                    {item?.user?.first_name} {item?.user?.last_name}
                  </p>
                  <p className="mb-0.5">{item?.user?.job_title}</p>
                  <p>{item?.shipping_address?.company?.company}</p>
                </div>
                <div className="w-full md:w-1/2 mt-5 md:mt-0">
                  <p className="font-semibold">Address</p>
                  <p className="mb-7">{item?.shipping_address?.address_1}</p>

                  <p className="font-semibold">Contact Details</p>
                  <p>{item?.user.email}</p>
                  <p>{item?.shipping_address?.phone_number}</p>
                </div>
              </div>
            )}

            <div className="p-5 bg-[#F6F6F6] rounded-md mt-4">
              <div className="pb-3 border-b border-[#C8C8C8]">
                <p className="uppercase">Order Summary</p>
              </div>
              {item?.order?.instructions && (
                <>
                  <div className="mt-4">
                    <p>
                      <span className="text-red-500">Instructions:</span>{" "}
                      {item?.order?.instructions}
                    </p>
                  </div>

                  <Separator className="my-4 bg-[#C8C8C8]" />
                </>
              )}

              <div>
                {item.order?.product.map((prod, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-8 py-6 border-b border-[#C8C8C8] w-full"
                  >
                    <div className="flex flex-col md:flex-row items-center w-full">
                      <img
                        src={getAwsFilesBaseUrl(prod.productToCart.photo[0])}
                        alt=""
                        className="max-w-[120px] md:max-w-[60px] me-0 md:me-10  mb-3 md:mb-0"
                      />
                      <div className="w-full flex justify-between">
                        <div>
                          <h3 className="font-bold">
                            {prod.productToCart?.name}
                          </h3>
                          <p>{prod.productToCart?.material?.name}</p>
                          <p className="text-slate-400 text-sm">
                            Frame type:{" "}
                            <span className="text-black">
                              {prod.orderDetails.frameCanvasThick}
                            </span>
                          </p>
                          <p className="text-slate-400 text-sm">
                            Frame size:{" "}
                            <span className="text-black">
                              {prod.orderDetails.frameCanvasSize}
                            </span>
                          </p>
                          <p className="text-slate-400 text-sm">
                            Request sample:{" "}
                            <span className="text-black">
                              {prod.requestSample == true ? "Yes" : "No"}
                            </span>
                          </p>
                          <p className="text-slate-400 text-sm">
                            Request 3D sample:{" "}
                            <span className="text-black">
                              {prod.request3DSample == true ? "Yes" : "No"}
                            </span>
                          </p>
                          {(prod?.addressBldgLocation != undefined ||
                            prod?.addressFloorLevel != undefined ||
                            prod?.addressFloorLevel !=
                              prod?.addressRoomType) && (
                            <p className="text-slate-400 text-sm">
                              Location:{" "}
                              <span className="text-black">{`${prod?.addressBldgLocation} ${prod?.addressFloorLevel} ${prod?.addressRoomType}`}</span>
                            </p>
                          )}
                          {prod?.addressNote && (
                            <p className="text-slate-400 text-sm">
                              User note:{" "}
                              <span className="text-black">
                                {prod?.addressNote}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between flex-col items-end">
                          <p>
                            ${" "}
                            {prod?.orderDetails?.quantity *
                              prod?.orderDetails?.price}
                          </p>
                          <p>x {prod.orderDetails.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-4 flex flex-col w-full gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full uppercase py-6 font-bold text-md"
                    variant="outlinePrimary"
                  >
                    Send an email
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <Forms itemId={item.order.id}></Forms>
                </DialogContent>
              </Dialog>
              {/* <ToggleStatusAction
                orderStatus={item.order.status}
                itemId={item.order.id}
              ></ToggleStatusAction> */}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Actions;
