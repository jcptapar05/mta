"use client";
import React, { useState } from "react";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

import ReactPlayer from "react-player/lazy";

const Slider = () => {
  const [showVR] = useState(false);
  const [videoStatus] = useState(false);

  return (
    <div className="flex h-[85vh] w-screen relative react-player">
      <ReactPlayer
        muted={true}
        loop={true}
        playsinline={true}
        width="100%"
        height="100%"
        playing={true}
        url={getAwsFilesBaseUrl("/homepage/MTA-JACK-FLYTHROUGH.mp4")}
      />

      {/* OVERLAY */}
      {!showVR && (
        <div className="absolute top-0 left-0 h-[100%] w-screen bg-black bg-opacity-30 z-[2]"></div>
      )}
      {!videoStatus && (
        <div className="absolute flex items-end md:items-center pb-4 justify-center w-full h-full z-10">
          <div className="flex flex-col items-center md:text-center px-5">
            <div className="mb-5 md:mb-0">
              <h1 className="text-3xl md:text-6xl font-bold text-white">
                Welcome to My Top Arts
              </h1>
            </div>
            <div className="flex flex-row md:flex-col justify-between items-center w-full">
              <p className="md:max-w-xl font-light tracking-wide md:mb-10 md:mt-5 leading-6 text-white">
                dedicated to enhancing beautification within the residential,
                commercial, and hospitality real estate industries through
                curated wall art solutions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
