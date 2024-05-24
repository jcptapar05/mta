"use client";
import React from "react";

const FrameAndPackaging = () => {
  return (
    <>
      <div className="mb-12">
        <p className="text-[16px] mb-3">2mm Acrylic Frame:</p>
        <div className="w-full  md:flex-row flex-col flex justify-around">
          <img
            src="/frames/60X90 2mm side.png"
            alt=""
          />
          <img
            src="/frames/60X90 2mm.png"
            alt=""
          />
        </div>
      </div>
      <div className="mb-12">
        <p className="text-[16px] mb-3">3mm Acrylic Frame:</p>
        <div className="w-full flex md:flex-row flex-col justify-around">
          <img
            src="/frames/3MM SIDE.png"
            alt=""
          />
          <img
            src="/frames/3MM.png"
            alt=""
          />
        </div>
      </div>
      <div className="mb-12 flex flex-col">
        <h1 className="text-[24px] mb-3 font-medium">Packaging</h1>
        <p className="text-[16px] mb-10 font-light">
          We package our wall arts securely to ensure that the wall arts
          received by client are of highest quality. We package in 1, 3 or 4
          pieces per box.
        </p>
        <img
          className="self-center"
          src="/frames/image 81.png"
          alt=""
        />
      </div>
    </>
  );
};

export default FrameAndPackaging;
