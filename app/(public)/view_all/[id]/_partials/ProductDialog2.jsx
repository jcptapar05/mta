/* eslint-disable @next/next/no-img-element */
"use client";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { IoMdClose } from "react-icons/io";

import Product3D from "./Product3D";
import Product3DFullscreen from "./Product3DFullscreen";
const ProductDialog2 = ({
  onClose,
  productImage,
  productImg,
  product3dModel,
  currentView,
  productName,
  productThumbnail,
}) => {
  var settingsImage = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={getAwsFilesBaseUrl(productImage[i])}
            alt="art image"
          />
        </a>
      );
    },
    infinite: false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
  };

  var settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={getAwsFilesBaseUrl(productImg[i])}
            alt="art image"
          />
        </a>
      );
    },
    infinite: false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="absolute flex z-[110] top-0 left-0 w-full h-full items-center justify-center bg-transparent backdrop-blur-lg"
      onClick={onClose}
    >
      <div
        className="bg-[#000000] bg-opacity-40 shadow-2xl w-screen h-[80%] md:h-screen relative"
        onClick={handleInnerClick}
      >
        {currentView == "images" && (
          <Slider
            {...settings}
            className="product-photo relative w-full h-full text-center shadow-2xl "
          >
            {productImg.map((item, index) => (
              <img
                key={index}
                src={getAwsFilesBaseUrl(item)}
                alt=""
                className="w-full h-full object-contain md:object-contain"
              />
            ))}
          </Slider>
        )}

        {currentView == "3d" && product3dModel && (
          <Product3DFullscreen
            product3dModel={product3dModel}
            productName={productName}
            productThumbnail={productThumbnail}
          ></Product3DFullscreen>
        )}

        {currentView == "product" && (
          // <img
          //   className="h-full w-full object-contain"
          //   src={getAwsFilesBaseUrl(productImage[0])}
          // />
          <Slider
            {...settingsImage}
            className="product-photo relative w-full h-full text-center shadow-2xl "
          >
            {productImage.map((item, index) => (
              <img
                key={index}
                src={getAwsFilesBaseUrl(item)}
                alt=""
                className="w-full h-full object-contain md:object-contain"
              />
            ))}
          </Slider>
        )}
        {/* <div className="absolute bottom-0 right-0 flex flex-col">
          <button>Fullscreen</button>
          <button>Fullscreen</button>
          <button>Fullscreen</button>
        </div> */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mr-2 mt-2 bg-white rounded-full"
        >
          <IoMdClose size={22} />
        </button>
      </div>
    </div>
  );
};

export default ProductDialog2;
