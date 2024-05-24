/* eslint-disable @next/next/no-img-element */
import { Separator } from "@/components/ui/separator";
import React from "react";

const ExploreArt = () => {
  return (
    <div className="container relative flex flex-col items-center">
      <div className="w-full h-full absolute">
        <Separator
          className="bg-black w-0.5 z-10 h-full md:h-full mx-auto"
          orientation="vertical"
        ></Separator>
      </div>
      <div className="w-full px-12 z-20 md:max-w-[600px] mt-16 bg-white py-3  text-center">
        <h2 className="text-2xl mb-3">Let your Eyes do the Walking</h2>
        <p>
          Explore our VR Ready showrooms and explore art anytime anywhere in
          your own convenience.
        </p>
      </div>
      <div className="w-full md:px-12 z-20 md:max-w-[900px] mt-16 bg-white py-3  text-center">
        <img
          src="/what_we_do_best/virtual.png"
          alt=""
        />
      </div>
      <div className="w-full px-12 z-20 md:max-w-[600px] mt-16 md:mb-48 mb-24 bg-white py-3 text-center">
        <h2 className="text-2xl mb-3">Seamless Interaction</h2>
        <p>
          Schedule live showings, meet with a live agent inside the virtual art
          gallery for personalized consultations and support.
        </p>
      </div>
    </div>
  );
};

export default ExploreArt;
