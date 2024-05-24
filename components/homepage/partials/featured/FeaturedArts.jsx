"use client";
import { useImageStore } from "@/store/useImageStore";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const latestData = [
  {
    id: 766,
    name: "JD-F-1346",
    photo: "./latest_room_types/JD-F-1346.webp",
    description:
      "This is an intriguing image of a majestic moose, flaunting its impressive antlers against a stark black background. The creature's brown coat offers a rich contrast to the darkness, while its antlers, a marvel of natural symmetry, are an amazing spectacle. The wilderness setting subtly enhances the grandeur of this magnificent animal, truly a sight to behold.",
    frame_size: [{ height: 35.43, width: 23.62, depth: 2.76 }],
    colors: ["#daa563", "#201b16", "#8f6e4f"],
    commercial_lobby: "./latest_room_types/Commercial/Commercial Lobby1.webp",
    commercial_corridor:
      "./latest_room_types/Commercial/Commercial Corridor1.webp",
    commercial_gym: "./latest_room_types/Commercial/Commercial Gym1.webp",
    hospitality_bedroom:
      "./latest_room_types/Hospitality/Hospital Bedroom1.webp",
    residential_kitchen:
      "./latest_room_types/Residential/Residential Kitchen1.webp",
    residential_living_room:
      "./latest_room_types/Residential/Residential Living Room1.webp",
    residential_outdoor:
      "./latest_room_types/Residential/Residential Outdoor1.webp",
  },
  {
    id: 768,
    name: "JD-B492",
    photo: "./latest_room_types/JD-B492.webp",
    description:
      "A close examination reveals the intricate depth of an art piece, its essence captured in a single frame. The painting intriguingly balances the stark contrast of black and white, with a hint of blue subtly woven in. It seems to depict an abstract landscape, an enigmatic play of color and form. The artistry and technique hint at a profound understanding of the art world.",
    frame_size: [{ height: 35.43, width: 23.62, depth: 2.76 }],
    colors: ["#0d1314", "#eae7dd", "#5e5049"],
    commercial_lobby: "./latest_room_types/Commercial/Commercial Lobby2.webp",
    commercial_corridor:
      "./latest_room_types/Commercial/Commercial Corridor2.webp",
    commercial_gym: "./latest_room_types/Commercial/Commercial Gym2.webp",
    hospitality_bedroom:
      "./latest_room_types/Hospitality/Hospital Bedroom2.webp",
    residential_kitchen:
      "./latest_room_types/Residential/Residential Kitchen2.webp",
    residential_living_room:
      "./latest_room_types/Residential/Residential Living Room2.webp",
    residential_outdoor:
      "./latest_room_types/Residential/Residential Outdoor2.webp",
  },
  {
    id: 751,
    name: "JD-F-1261",
    photo: "./latest_room_types/JD-F-1261.webp",
    description:
      "This image captures the grandeur of architecture, presenting a symmetrical hallway adorned with a multitude of pillars. Each pillar, an embodiment of strength and stability, guides the viewer's gaze towards a wooden door, the centerpiece of this scene. The monochrome palette of grey and white, punctuated by an accent of warm brown, adds a classic touch to this indoor setting.",
    frame_size: [{ height: 35.43, width: 23.62, depth: 2.76 }],
    colors: ["#b3aba4", "#dcdbdf", "#6d462e"],
    commercial_lobby: "./latest_room_types/Commercial/Commercial Lobby3.webp",
    commercial_corridor:
      "./latest_room_types/Commercial/Commercial Corridor3.webp",
    commercial_gym: "./latest_room_types/Commercial/Commercial Gym3.webp",
    hospitality_bedroom:
      "./latest_room_types/Hospitality/Hospital Bedroom3.webp",
    residential_kitchen:
      "./latest_room_types/Residential/Residential Kitchen3.webp",
    residential_living_room:
      "./latest_room_types/Residential/Residential Living Room3.webp",
    residential_outdoor:
      "./latest_room_types/Residential/Residential Outdoor3.webp",
  },
  {
    id: 364,
    name: "Sample",
    photo: "./latest_room_types/JD-F-1265.webp",
    frame_size: [{ height: 3, width: 2, depth: 4 }],
    colors: ["#9a585b", "#8d4559", "#ff8243"],
  },
];

const FeaturedArts = () => {
  const { selectImage } = useImageStore();

  useEffect(() => {
    if (latestData.length > 0) {
      handleImageClick(latestData[0]);
    }
  }, []);

  const handleImageClick = (imageData) => {
    selectImage(imageData);
  };

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
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
    <div className="container">
      <div className="block space-x-4 lg:hidden">
        <Slider {...settings}>
          {latestData.slice(0, 3).map((imageData) => (
            <div
              key={imageData.id}
              className="p-2 w-full min-w-[100px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-[400px] lg:h-[200px] md:h-[250px] sm:h-[200px]"
            >
              <div
                className="p-2 px-3 relative cursor-pointer w-full h-full"
                style={{
                  backgroundColor: `${imageData?.colors}`,
                }}
                onClick={() => handleImageClick(imageData)}
              >
                <img
                  src={imageData?.photo}
                  alt=""
                  className="w-full h-full object-contain"
                />
                <div className="absolute w-full h-full transition-opacity hover:bg-opacity-0 duration-200 ease-in-out bg-black top-0 left-0 bg-opacity-40"></div>
              </div>
            </div>
          ))}
          {latestData.slice(3, 4).map((imageData, index) => (
            <div
              key={index}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-[400px] lg:h-[300px] md:h-[250px] sm:h-[200px]"
            >
              <div className="p-4 px-5 relative cursor-pointer w-full h-full">
                <img
                  src={imageData?.photo}
                  alt=""
                  className="w-full h-full object-contain"
                />
                <div className="absolute w-full h-full bg-black top-0 left-0 bg-opacity-60">
                  <Link href="/view_all">
                    <div className="flex gap-2 justify-center cursor-pointer text-sm lg:text-base items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white w-full ">
                      <p>See More</p>
                      <FaAngleRight />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {/*  */}
        </Slider>
      </div>
      {latestData.length > 0 && (
        <div className=" space-x-4 lg:flex hidden">
          {latestData.slice(0, 3).map((imageData, index) => (
            <div
              key={index}
              className={`w-1/4  h-[300px] p-4 relative cursor-pointer`}
              style={{ backgroundColor: `${imageData?.colors}` }}
              onClick={() => handleImageClick(imageData)}
            >
              <img
                src={imageData?.photo}
                alt=""
                className="w-full h-full max-h-[500px] object-contain"
              />
              <div className="absolute w-full h-full transition-opacity hover:bg-opacity-0 duration-200 ease-in-out bg-black top-0 left-0 bg-opacity-60"></div>
            </div>
          ))}
          {latestData.slice(3, 4).map((imageData, index) => (
            <div
              key={index}
              className="w-1/4 min-w-[250px] h-[300px] p-4 relative"
            >
              <img
                src={imageData?.photo}
                alt=""
                className="w-full h-full max-h-[500px] object-contain"
              />
              <div className="absolute w-full h-full bg-black top-0 left-0 bg-opacity-60"></div>
              <Link href="/view_all">
                <p className="flex cursor-pointer items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white">
                  See More <FaAngleRight />
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedArts;
