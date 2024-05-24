/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import getURL from "@/middleware/getUrl";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import { ScrollArea } from "@/components/ui/scroll-area";

const TotalLikes = () => {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const getTotalLikes = async () => {
      const response = await fetch(getURL("/api/v1/admin/likes"), {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();
      setTotal(data.likes);
    };

    getTotalLikes();
  }, []);

  return (
    <div className="w-full border rounded-lg">
      <div className="my-4 ms-4">
        <p className="uppercase font-semibold me-2">MOST liked</p>
      </div>
      <ScrollArea className="h-[54.8vh] w-full rounded-md">
        {total &&
          total?.length > 0 &&
          total.map((res, index) => (
            <div
              key={index}
              className="border-b py-3 px-5"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl md:text-4xl">{index + 1}</span>
                <img
                  src={getAwsFilesBaseUrl(res?.product[0]?.thumbnails)}
                  alt=""
                  className="h-[90px] w-[70px] object-contain mx-auto"
                />
                <div className="flex flex-col justify-end items-end">
                  <p>{res?.product[0]?.name}</p>
                  <p className="text-gray-400 text-sm">
                    {res.likes_count} likes
                  </p>
                </div>
              </div>
            </div>
          ))}
      </ScrollArea>
    </div>
  );
};

export default TotalLikes;
