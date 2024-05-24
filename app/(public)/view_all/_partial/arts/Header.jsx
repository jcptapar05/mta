/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="h-[400px] w-screen relative">
      <img
        src="/shopall/Header-Our-Products.svg"
        alt="Shop all header arts background"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <h1 className="w-full absolute uppercase top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 text-white text-4xl md:text-6xl">
        our wall arts
      </h1>
    </div>
  );
};

export default Header;
