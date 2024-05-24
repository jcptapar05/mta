import UserCardComponent from "@/components/card/UserCard/page";
import DefaultHeader from "@/components/header/DefaultHeader";
import React from "react";

const page = () => {
 return (
  <div className="h-full relative w-full">
   <div
    className="absolute inset-0 w-full"
    style={{
     backgroundImage: "url('/wallpaper.jpg')",
     backgroundRepeat: "no-repeat",
     backgroundSize: "cover",
     opacity: 0.2,
     zIndex: -1,
    }}
   ></div>
   <div className="container py-20 w-full flex flex-col items-center">
    <DefaultHeader title="What do you mainly want to do?"></DefaultHeader>
    <div className="w-full">
     <UserCardComponent />
    </div>
    <p className="w-3/4 text-center py-4">
     We’ll use this info to personalize your experience. You’ll always be able to both download and upload photos and videos, no matter which option you choose.
    </p>
    <button>(Terms and Agreement)</button>
   </div>
  </div>
 );
};

export default page;
