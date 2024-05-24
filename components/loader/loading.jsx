import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
 return (
  <>
   <div className="mb-6 flex justify-between">
    <Skeleton className="w-[100%] max-w-[400px] h-[50px] rounded-lg" />
    <Skeleton className="w-[100%] max-w-[400px] h-[50px] rounded-lg hidden md:block" />
   </div>
   <div className="mb-6 flex justify-between">
    <Skeleton className="w-[100%] max-w-[400px] h-[50px] rounded-lg" />
    <Skeleton className="w-[100%] max-w-[400px] h-[50px] rounded-lg hidden md:block" />
   </div>
   <div className="mb-4 flex justify-between">
    <Skeleton className="w-[100%] h-[300px] rounded-lg" />
   </div>
   <div className="mb-6 flex justify-end">
    <Skeleton className="w-[100%] max-w-[200px] h-[50px] rounded-lg" />
   </div>
  </>
 );
};

export default Loading;
