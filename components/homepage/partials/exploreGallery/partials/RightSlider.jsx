/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Slider from "react-slick";

const datas = [
  {
    header: "Lounge",
    desc: "Hospitality",
    image: "./our_gallery/right/image-1.png",
  },
  {
    header: "Gym",
    desc: "Hospitality",
    image: "./our_gallery/right/image-2.png",
  },
  {
    header: "Corridor",
    desc: "Hospitality",
    image: "./our_gallery/right/image-3.png",
  },
  {
    header: "Hotel Room",
    desc: "Hospitality",
    image: "./our_gallery/right/image-4.png",
  },
  {
    header: "Lobby",
    desc: "Hospitality",
    image: "./our_gallery/right/image-5.png",
  },
];

const RightSliders = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    beforeChange: (current, next) => {
      setActiveIndex(next);
    },
  };

  return (
    <Slider {...settings}>
      {datas.map((item, index) => (
        <div
          className="relative h-[430px] pb-0 m-0 "
          key={index}
        >
          <img
            className="mx-auto w-full h-full object-cover object-center"
            src={item.image}
          />
          <div className="absolute bottom-0 left-0 z-10 w-full h-[160px] bg-gradient-to-t from-black opacity-70"></div>
          <div
            className="absolute z-50 bottom-5 left-5 text-white "
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <h1 className="text-2xl md:text-5xl">{item.header}</h1>
            <p className=" font-normal">Hospitality</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default RightSliders;
