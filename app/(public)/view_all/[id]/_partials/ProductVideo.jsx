/* eslint-disable @next/next/no-img-element */
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import React from "react";

const ProductVideo = ({ productVideo, productName }) => {
  return (
    <div className="h-full w-full">
      {productName && (
        <video
          playsInline
          autoPlay
          muted
          loop
          controls
          className="h-full object-cover"
        >
          <source
            src={getAwsFilesBaseUrl(
              `/arts/${productName}/videos/${productVideo}`,
            )}
            type="video/mp4"
            playsInline
            autoPlay
            muted
            loop
          />
          <source
            src={getAwsFilesBaseUrl(
              `/arts/${productName}/videos/${productVideo}`,
            )}
            type="video/ogg"
            playsInline
            autoPlay
            muted
            loop
          />
          Your browser does not support HTML video.
        </video>
      )}
    </div>
  );
};

export default ProductVideo;
