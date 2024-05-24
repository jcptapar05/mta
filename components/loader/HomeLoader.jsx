import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HomeLoader = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[100%] h-[80px] rounded-lg bg-gray-200" />
        <Skeleton className="w-[100%] h-[20px] rounded-lg bg-gray-200" />
        <Skeleton className="w-[100%] h-[20px] rounded-lg bg-gray-200" />
      </div>
    </>
  );
};

export default HomeLoader;
