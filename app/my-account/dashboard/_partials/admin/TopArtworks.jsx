"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import getURL from "@/middleware/getUrl";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

const TopArtworks = () => {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const getTotalLikes = async () => {
      const response = await fetch(getURL("/api/v1/admin/top_art_works"), {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();
      setTotal(data.mostOrdered);
    };

    getTotalLikes();
  }, []);

  return (
    <Card className="w-full  p-0">
      <CardContent className="p-0">
        <div className="flex items-center justify-between py-4 px-8">
          <p className="uppercase font-semibold">TOP ARTWORK</p>

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

        <ScrollArea className="mt-5 h-[69vh] w-full rounded-md">
          {total.length > 0 &&
            total.map((item) => (
              <div
                key={item.id}
                className="flex justify-around items-center py-4 border-b-2"
              >
                <div className="flex items-center space-x-4">
                  <p>{item?.id}</p>
                  <div className="h-20 w-auto p-4 bg-gray-200">
                    <img
                      src={getAwsFilesBaseUrl(item.thumbnails)}
                      alt=""
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
                <p className="text-sm text-green-600 flex items-center">
                  {/* +18% <HiOutlineArrowNarrowUp /> */}
                </p>
                <div>
                  <p>{item?.name}</p>
                  <p className="text-gray-400 text-sm text-end">
                    x {item?.total_sold}
                  </p>
                </div>
              </div>
            ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TopArtworks;
