"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const Space = () => {
  return (
    <div className="container relative flex flex-col items-center">
      <div className="w-full h-full absolute">
        <Separator
          className="bg-black w-0.5 z-10 h-full md:h-full mx-auto"
          orientation="vertical"
        ></Separator>
      </div>
      <div className="w-full px-12 z-20 md:max-w-[600px] mt-16 bg-white py-3  text-center">
        <h2 className="text-2xl mb-3">Frame Options</h2>
        <p>
          Our decorative wall arts are printed on 2mm or 3mm acrylic frame
          available on 36 x 24, 48 x 32, 96 x 48 in.
        </p>
      </div>
      <div className="w-full px-12 z-20 md:max-w-[600px] mt-16 bg-white py-3 text-center">
        <h2 className="text-2xl mb-3">Made to Order</h2>
        <p>
          Let your eyes do the shopping with our specifically made to order wall
          arts. Tailoring to your unique vision and customization needs.
        </p>
      </div>
      <div className="w-full px-12 z-20 md:max-w-[600px] mt-16 mb-96 md:mb-36 bg-white py-3 text-center">
        <h2 className="text-2xl mb-3">Visualize Art in Your Space</h2>
        <p>
          Let your eyes do the showing and experience our AR feature to
          visualize and preview selected art in your space before
          making decisions.
        </p>
      </div>
    </div>
  );
};

export default Space;
