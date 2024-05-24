"use client";
import React from "react";
// import "@google/model-viewer";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

const Product3D = ({ product3dModel, productName }) => {
  return (
    <>
      <div className="h-full w-full p-2 flex items-center justify-center bg-transparent">
        {product3dModel && productName ? (
          <div className="h-full w-full">
            <model-viewer
              src={getAwsFilesBaseUrl(
                `/arts/${productName}/three_d/${product3dModel}`,
              )}
              ios-src={getAwsFilesBaseUrl(
                `/arts/${productName}/three_d/${product3dModel}`,
              )}
              poster="/loaderbounce.svg"
              alt="A 3D model of an astronaut"
              shadow-intensity="1"
              camera-controls
              // camera-orbit="0deg 90deg 10%"
              auto-rotate
              // ar
              // ar-modes="webxr scene-viewer quick-look"
              style={{ width: "100%", height: "100%" }}
            ></model-viewer>
          </div>
        ) : (
          <div>
            <p>INVALID</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Product3D;
