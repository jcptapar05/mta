/* eslint-disable @next/next/no-img-element */
import getURL from "@/middleware/getUrl";
import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";
import { RxInfoCircled } from "react-icons/rx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const ProductAr = ({ productAr, productId }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <QRCode
        className="w-full h-full object-cover max-h-[300px]"
        value={getURL(`/model-viewer/${productId}`)}
      />
      <p className="mt-10 flex items-center space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
              >
                <RxInfoCircled size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="max-w-sm">
                Scanning the AR code lets you add an extra dimension to the
                product by creating interactive content to the real world around
                you.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>Scan the QR Code</span>
      </p>
    </div>
  );
};

export default ProductAr;
