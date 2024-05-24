"use client";
import React, { useEffect, useState } from "react";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import getURL from "@/middleware/getUrl";

import { useParams } from "next/navigation";
import { PiCubeFocus } from "react-icons/pi";

const ViewerPage = () => {
  const params = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        getURL(`/api/v1/public/products/${+params.id}`),
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Cache-Control": "no-cache",
          },
        },
      );

      const data = await response.json();
      setProduct(data.product);
    };

    getProduct();
  }, []);

  return (
    <div className="h-screen w-screen bg-[url('https://mytoparts.com/background.svg')] bg-no-repeat bg-cover">
      <div className="w-full h-full bg-white bg-opacity-40">
        <model-viewer
          src={getAwsFilesBaseUrl(
            `/arts/${product?.name}/three_d/${product?.glb_file_3d}`,
          )}
          // ios-src={getAwsFilesBaseUrl(
          //   `/arts/${product?.name}/three_d/${product?.glb_file_3d}`,
          // )}
          poster="/loaderbounce.svg"
          alt="A 3D model of an astronaut"
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
          ar-modes="webxr scene-viewer quick-look"
          style={{ width: "100%", height: "100%" }}
        >
          <button
            slot="ar-button"
            className="flex gap-x-2 text-center bg-white rounded-xl py-1 px-2 text-sm mx-auto mt-16"
          >
            <PiCubeFocus
              size={24}
              className="text-orange-500"
            />
            <span className="mt-0.5">View in your space</span>
          </button>
        </model-viewer>
      </div>
    </div>
  );
};

export default ViewerPage;
