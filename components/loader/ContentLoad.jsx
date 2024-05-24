import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ContentLoad = () => {
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Skeleton className="w-[100%] h-[300px] rounded-lg" />
      </div>
      <div className="mb-6 flex justify-between">
        <Skeleton className="w-[100%] hidden max-w-[400px] h-[50px] rounded-lg" />
        <Skeleton className="w-[100%] h-[50px] rounded-lg" />
      </div>
      <div className="mb-6 flex justify-between">
        <Skeleton className="w-[100%] hidden max-w-[400px] h-[50px] rounded-lg" />
        <Skeleton className="w-[100%] h-[50px] rounded-lg" />
      </div>
    </div>
  );
};

export default ContentLoad;
