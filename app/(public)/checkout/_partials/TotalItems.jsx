import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import React from "react";

const TotalItems = ({ item }) => {
  return (
    <div
      key={item.id}
      className="mb-4 border-b pb-3 border-slate-300 flex justify-between"
    >
      <div className="flex">
        <div className="me-3">
          <img
            src={getAwsFilesBaseUrl(item?.productToCart?.photo[0])}
            alt="Product Image"
            className="h-[110px] w-[80px] object-contain"
          />
        </div>
        <div>
          <h3 className="font-bold text-xl">{item?.productToCart?.name}</h3>
          <p className="font-thin">{item?.productToCart?.material?.name}</p>
          <div>
            <p className="text-slate-400 text-sm">
              Frame type:{" "}
              <span className="text-black">
                {item.orderDetails.frameCanvasThick}
              </span>
            </p>
            <p className="text-slate-400 text-sm">
              Frame size:{" "}
              <span className="text-black">
                {item.orderDetails.frameCanvasSize}
              </span>
            </p>
            <p className="text-slate-400 text-sm">
              Request sample:{" "}
              <span className="text-black">
                {item.requestSample == true ? "Yes" : "No"}
              </span>
            </p>
            <p className="text-slate-400 text-sm">
              Request 3D sample:{" "}
              <span className="text-black">
                {item.request3DSample == true ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <p className="font-thin">x {item?.orderDetails?.quantity}</p>
      </div>
    </div>
  );
};

export default TotalItems;
