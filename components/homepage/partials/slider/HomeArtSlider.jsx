import ArtSlider from "@/components/slider/ArtSlider";
import React from "react";

const HomeArtSlider = () => {
  return (
    <div className="h-screen w-screen mt-40 mb-20">
      <div className="relative text-center">
        <div className="homepageClipath">
          <div className="homepageClipathOutside">
            <div className="homepageClipathInside"></div>
          </div>
        </div>

        <div className="mx-auto text-center">
          <h4 className="bg-white inline-block px-10 text-2xl mb-2">
            What we do best
          </h4>
          <h3 className="text-4xl p-0 mb-2">
            Masterpieces Crafted with Passion
          </h3>
          <p className="p-0 max-w-[480px] mx-auto">
            Discover what we do best: where creativity seamlessly meets
            craftsmanship, unveiling timeless masterpieces.
          </p>
        </div>
        <ArtSlider></ArtSlider>
      </div>
    </div>
  );
};

export default HomeArtSlider;
