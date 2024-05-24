import React from "react";
import TopSliders from "./partials/TopSlider";
import LeftSliders from "./partials/LeftSlider";
import RightSliders from "./partials/RightSlider";
const ExploreGallery = () => {
  return (
    <div className="container mb-20 md:mb-40 lg:mt-40 mt-20">
      <div className="md:flex items-center w-full h-full justify-between mb-4">
        <div className="border-l border-[#C8C8C8] ps-6 md:pe-12 md:w-5/12 mb-4">
          <p className="text-xl mb-2">Explore</p>
          <h3 className="text-3xl md:text-5xl">
            Visualize Art in Diverse Settings
          </h3>
        </div>
        <TopSliders></TopSliders>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full h-[430px] md:w-1/2 mb-4 md:mb-0 pe-0 md:pe-2">
          <LeftSliders></LeftSliders>
        </div>
        <div className="w-full h-[430px] md:w-1/2 mb-4 md:mb-0 pe-0 md:ps-2">
          <RightSliders></RightSliders>
        </div>
      </div>
    </div>
  );
};

export default ExploreGallery;
