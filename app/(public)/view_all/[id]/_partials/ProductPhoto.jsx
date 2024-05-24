/* eslint-disable @next/next/no-img-element */
"use client";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import React, { useEffect, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import Slider from "react-slick";

// function NextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       onClick={onClick}
//     >
//       <SlArrowDown
//         style={{
//           ...style,
//           color: "gray",
//           fontSize: "20px",
//         }}
//       />
//     </div>
//   );
// }

// function PrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       onClick={onClick}
//     >
//       <SlArrowUp
//         style={{
//           ...style,
//           color: "gray",
//           fontSize: "20px",
//           // right: "-83px !important",
//         }}
//       />
//     </div>
//   );
// }

const ProductPhoto = ({ productImg }) => {
  // const [currentIndex, setCurrentIndex] = useState(1);
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
  };

  return (
    <div className="w-full h-full">
      <Slider
        {...settings}
        className="product-photo relative w-full h-full"
      >
        {productImg.map((item, index) => (
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

export default ProductPhoto;
