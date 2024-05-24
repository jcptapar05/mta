import Image from "next/image";
import React from "react";

const MainHeader = () => {
  return (
    <div className="w-screen py-20 md:py-32 bg-[url('/virtual-gallery/Header-Enter-Virtual-Gallery.svg')] bg-no-repeat bg-cover bg-center md:bg-right-bottom overflow-hidden">
      <div className=" text-white text-center px-10">
        <h1 className="mb-4 text-4xl md:text-6xl">ENTER VIRTUAL GALLERY</h1>
        <p className="max-w-[600px] mx-auto">
          Immerse yourself virtually in our curated collection of masterpieces,
          where you can explore the intricate details and rich narratives of
          each work from the comfort of your own space.
        </p>
      </div>
    </div>
  );
};

export default MainHeader;
