"use client";
import InputWithQuantity from "@/components/inputwithquantity/InputWithQuantity";

import React, { useState, useEffect } from "react";

const CheckoutCard = React.forwardRef(
  (
    {
      title,
      price,
      imageSrc,
      materials,
      size,
      colorPalette,
      onQuantityChange,
      value,
    },
    ref,
  ) => {
    const [flexDirection, setFlexDirection] = useState("flex-row");
    useEffect(() => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        setFlexDirection(
          img.width > img.height ? "flex-col" : "flex-row gap-8",
        );
      };
    }, [imageSrc]);

    const handleQuantityChange = (newQuantity) => {
      onQuantityChange && onQuantityChange(newQuantity);
    };

    return (
      <div
        ref={ref}
        className="grid space-x-6 w-[500px] h-fit"
      >
        <div
          className={`flex w-full h-full overflow-hidden px-8 ${flexDirection}`}
        >
          <div className="w-full">
            <img
              className="w-full h-full object-cover"
              src={imageSrc}
              alt={"img" + value}
            />
          </div>
          <div className="flex flex-col w-full gap-2 justify-center">
            <p className="text-2xl font-bold">{title}</p>
            <p className="text-lg font-bold">${price}</p>
            <p>Materials: {materials}</p>
            <p>Size: {size}</p>
            <div className="flex flex-col gap-2">
              <p>Color Palette in Painting</p>
              <div className="flex gap-4">
                {colorPalette &&
                  colorPalette.map((color, index) => (
                    <span
                      key={index}
                      className={`py-4 px-4 rounded-full bg-[#${color}]`}
                    ></span>
                  ))}
              </div>
            </div>
            <InputWithQuantity onQuantityChange={handleQuantityChange} />
          </div>
        </div>
      </div>
    );
  },
);
export default CheckoutCard;
