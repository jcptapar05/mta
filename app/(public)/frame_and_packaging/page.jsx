import React from "react";
import Headers from "./_partials/headers";
import FrameAndPackaging from "./_partials/frame_and_packaging";

export const metadata = {
  title: "My Top Arts |Frame and Packaging",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="container mx-auto mb-20 mt-10 md:mt-20">
      <Headers></Headers>
      <FrameAndPackaging></FrameAndPackaging>
    </div>
  );
};

export default page;
