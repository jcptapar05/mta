/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PiArrowsOutSimpleBold } from "react-icons/pi";
import ProductButton from "./ProductButton";
import ProductImage from "./ProductImage";
import Product3D from "./Product3D";
import { BsArrowsFullscreen } from "react-icons/bs";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

const ProductDialog = ({ productImage, product3dModel }) => {
  const [show3D, setShow3D] = useState(false);

  const toggleProductImage = () => {
    setShow3D(!show3D);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="h-8 md:h-10 w-8 md:w-10 bg-white flex items-center justify-center rounded-full z-50">
          <BsArrowsFullscreen className="text-md md:text-xl" />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 m-0 w-full md:max-w-[90%] max-w-[100%] max-h-[80vh] overflow-hidden rounded-lg">
        <div className="h-[90vh] flex justify-center items-center">
          {/* {!show3D && <ProductImage productImage={productImage}></ProductImage>} */}
          {!show3D && (
            <img
              className="h-full w-full object-contain"
              src={getAwsFilesBaseUrl(productImage[0])}
            />
          )}
          {show3D && <Product3D product3dModel={product3dModel}></Product3D>}
        </div>

        <div className="absolute h-10 w-10 z-10 bottom-0 right-0">
          <ProductButton
            toggleButton={toggleProductImage}
            show3D={show3D}
          ></ProductButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
