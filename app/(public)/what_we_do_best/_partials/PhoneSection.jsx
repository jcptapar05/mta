/* eslint-disable @next/next/no-img-element */
import React from "react";

const PhoneSection = () => {
  return (
    <div className="h-[380px] bg-black relative">
      <div className="absolute top-[22%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
        <img
          src="/what_we_do_best/phone-ar-demo.png"
          alt=""
          className="md:w-[700px] min-w-[700px] object-contain hidden md:flex"
        />
      </div>
      <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
        <img
          src="/what_we_do_best/phone-portrait.png"
          alt=""
          className="max-h-[600px] max-w-[400px] min-w-[300px] w-full object-contain mx-auto block md:hidden"
        />
      </div>
    </div>
  );
};

export default PhoneSection;
