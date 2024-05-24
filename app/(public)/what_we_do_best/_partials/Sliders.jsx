/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Slider from "react-slick";

const Sliders = () => {
  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black h-[400px] md:h-[550px] overflow-hidden">
      <Slider {...settings}>
        <div className="h-[350px] md:h-[500px] mt-6 px-4 mx-auto md:mx-32 lg:mx-48 focus-within:ring-0">
          <img
            className="mx-auto h-[350px] md:h-[500px] object-cover"
            src="/what_we_do_best/slider/Carousel-1.svg"
          />
        </div>
        <div className="h-[350px] md:h-[500px] mt-6 px-4 mx-auto md:mx-32 lg:mx-48 focus-within:ring-0">
          <img
            className="mx-auto h-[350px] md:h-[500px] object-cover"
            src="/what_we_do_best/slider/Carousel-2.svg"
          />
        </div>
        <div className="h-[350px] md:h-[500px] mt-6 px-4 mx-auto md:mx-32 lg:mx-48 focus-within:ring-0">
          <img
            className="mx-auto h-[350px] md:h-[500px] object-cover"
            src="/what_we_do_best/slider/Carousel-3.svg"
          />
        </div>
        <div className="h-[350px] md:h-[500px] mt-6 px-4 mx-auto md:mx-32 lg:mx-48 focus-within:ring-0">
          <img
            className="mx-auto h-[350px] md:h-[500px] object-cover"
            src="/what_we_do_best/slider/Carousel-4.svg"
          />
        </div>
        <div className="h-[350px] md:h-[500px] mt-6 px-4 mx-auto md:mx-32 lg:mx-48 focus-within:ring-0">
          <img
            className="mx-auto h-[350px] md:h-[500px] object-cover"
            src="/what_we_do_best/slider/Carousel-5.svg"
          />
        </div>
        <div className="h-[350px] md:h-[500px] mt-6 px-4 mx-auto md:mx-32 lg:mx-48 focus-within:ring-0">
          <img
            className="mx-auto h-[350px] md:h-[500px] object-cover"
            src="/what_we_do_best/slider/Carousel-6.svg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Sliders;
