"use client";
import React, { useState, useEffect } from "react";
// import "@google/model-viewer";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

const Product3DFullscreen = ({
  product3dModel,
  productName,
  productThumbnail,
}) => {
  const [cameraOrbit, setCameraOrbit] = useState("0deg 90deg 110%");
  useEffect(() => {
    const updateCameraOrbit = () => {
      if (productThumbnail) {
        const img = new Image();
        img.src = getAwsFilesBaseUrl(productThumbnail);
        img.onload = () => {
          const aspectRatio = img.width / img.height;

          // Set camera orbit based on aspect ratio
          if (aspectRatio > 1) {
            // Landscape image
            setCameraOrbit("0deg 90deg 10%");
          } else {
            // Portrait image
            setCameraOrbit("0deg 90deg 85%");
          }
        };
      }
    };

    // Update camera orbit when productThumbnail changes
    updateCameraOrbit();
  }, [productThumbnail]);

  return (
    <>
      <div className="h-full w-full p-2 flex items-center justify-center bg-transparent">
        {product3dModel && productName && productThumbnail !== null ? (
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
              camera-orbit={cameraOrbit}
              auto-rotate
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

export default Product3DFullscreen;
