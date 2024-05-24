/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Slider from "react-slick";

const datas = [
  {
    header: "Foyer",
    desc: "Residential",
    image: "./our_gallery/left/image-1.png",
  },
  {
    header: "Kitchen",
    desc: "Residential",
    image: "./our_gallery/left/image-2.png",
  },
  {
    header: "Hallway",
    desc: "Residential",
    image: "./our_gallery/left/image-3.png",
  },
  {
    header: "Guest Room",
    desc: "Residential",
    image: "./our_gallery/left/image-4.png",
  },
  {
    header: "Bed Room",
    desc: "Residential",
    image: "./our_gallery/left/image-5.png",
  },
  {
    header: "Living Room",
    desc: "Residential",
    image: "./our_gallery/left/image-6.png",
  },
];

const LeftSliders = () => {
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
            <p className="font-normal">{item.desc}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default LeftSliders;
