import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbCurrencyDollar } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { manrope } from "@/app/fonts";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";

const TotalOrders = ({ totalPurchaseOrders }) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <p className="uppercase font-semibold">Total Purchase Orders</p>

          {/* <Select>
            <SelectTrigger className="w-[120px] focus-visible:ring-0 border-0 bg-gray-100 text-xs h-7">
              <SelectValue
                placeholder="Select"
                className="focus-visible:ring-0 "
              />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectItem
                className="text-xs"
                value="daily"
              >
                Daily
              </SelectItem>
              <SelectItem
                className="text-xs"
                value="light"
              >
                Monthly
              </SelectItem>
              <SelectItem
                className="text-xs"
                value="dark"
              >
                Yearly
              </SelectItem>
              <SelectItem
                className="text-xs"
                value="system"
              >
                All
              </SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <h3 className={`flex items-center text-4xl ${manrope.className}`}>
            {/* <TbCurrencyDollar className="text-5xl" />  */}
            {totalPurchaseOrders}
          </h3>
          <p className="text-xl text-red-600 flex items-center">
            {/* -10% <HiOutlineArrowNarrowDown /> */}
          </p>
        </div>
      </CardContent>
      {/* <Separator className></Separator>
      <CardFooter className="py-4 px-6">
        <div className="flex justify-between items-center w-full">
          <p className="text-gray-400">Todays Orders</p>
          <p className="flex items-center text-2xl">
            <TbCurrencyDollar className="text-3xl" /> 123
          </p>
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default TotalOrders;
