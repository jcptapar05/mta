/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Slider from "react-slick";

const ArtSlider = () => {
 const settings = {
  infinite: true,
  speed: 400,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  autoplay: true,
  centerPadding: "200px",
 };
 return (
  <div>
   <Slider {...settings}>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-B462.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-B479.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-B535.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-B551.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-B571.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-B573.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-B576.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-B620.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-C646.jpg"
     />
    </div>
    <div>
     <img
      className="mx-auto text-center"
      src="./carousel/JD-G-1986.jpg"
     />
    </div>
   </Slider>
  </div>
 );
};

export default ArtSlider;
