/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Slider from "react-slick";

const datas = [
  {
    header: "Public Space",
    desc: "Commercial",
    image: "./our_gallery/top/image-1.png",
  },
  {
    header: "Bank",
    desc: "Commercial",
    image: "./our_gallery/top/image-2.png",
  },
  {
    header: "Healthcare",
    desc: "Commercial",
    image: "./our_gallery/top/image-3.png",
  },
  {
    header: "Restaurant",
    desc: "Commercial",
    image: "./our_gallery/top/image-4.png",
  },
  {
    header: "Retail",
    desc: "Commercial",
    image: "./our_gallery/top/image-5.png",
  },
  {
    header: "Office",
    desc: "Commercial",
    image: "./our_gallery/top/image-6.png",
  },
];

const TopSliders = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current, next) => {
      setActiveIndex(next);
    },
  };

  return (
    <div className="w-full h-[430px] md:w-7/12">
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
            <div className="absolute bottom-0 z-10 w-full h-[160px] bg-gradient-to-t from-black opacity-70"></div>
            <div
              className="absolute z-50 bottom-5 left-8 text-white "
              style={{
                opacity: index === activeIndex ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            >
              <h1 className="text-2xl md:text-5xl">{item.header}</h1>
              <p className=" font-normal">{item.desc}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopSliders;
