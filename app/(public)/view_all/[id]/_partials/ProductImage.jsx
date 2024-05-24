"use client";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import React from "react";
import Slider from "react-slick";

const ProductImage = ({ productImage }) => {
  var settings = {
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
  };

  return (
    <div className="w-full h-full">
      <Slider
        {...settings}
        className="product-photo relative w-full h-full text-center"
      >
        {productImage?.map((item, index) => (
          <img
            key={index}
            src={getAwsFilesBaseUrl(item)}
            alt=""
            className="w-full h-full object-cover"
          />
        ))}
      </Slider>
    </div>
  );
};

export default ProductImage;
