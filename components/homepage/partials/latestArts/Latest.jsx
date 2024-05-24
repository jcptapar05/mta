/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useImageStore } from "@/store/useImageStore";

const Latest = () => {
  const { selectedImage } = useImageStore();
  const imageToDisplay = selectedImage;
  const realEstateData = {
    Commercial: {
      Lobby: {
        id: "1",
        selectedImage: imageToDisplay?.commercial_lobby,
      },
      Gym: {
        id: "2",
        selectedImage: imageToDisplay?.commercial_gym,
      },
      Corridor: {
        id: "3",
        selectedImage: imageToDisplay?.commercial_corridor,
      },
    },
    Residential: {
      Kitchen: {
        id: "1",
        selectedImage: imageToDisplay?.residential_kitchen,
      },
      "Living Room": {
        id: "2",
        selectedImage: imageToDisplay?.residential_living_room,
      },
      Outdoor: {
        id: "3",
        selectedImage: imageToDisplay?.residential_outdoor,
      },
    },
    Hospitality: {
      "Hotel Bedroom": {
        id: "1",
        selectedImage: imageToDisplay?.hospitality_bedroom,
      },
    },
  };
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(realEstateData)[0],
  );
  const [selectedSpace, setSelectedSpace] = useState(
    Object.keys(realEstateData[selectedCategory])[0],
  );
  const [selectedRoomTypeImg, setSelectedRoomTypeImg] = useState(
    realEstateData[selectedCategory][selectedSpace]?.selectedImage || "",
  );

  useEffect(() => {
    setSelectedRoomTypeImg(
      realEstateData[selectedCategory][selectedSpace]?.selectedImage || "",
    );
  }, [selectedImage]);

  const handleCategoryChange = (category) => {
    const categorySpaces = Object.keys(realEstateData[category]);
    const defaultSpace = categorySpaces[0];
    setSelectedCategory(category);
    setSelectedSpace(defaultSpace);
    setSelectedRoomTypeImg(
      realEstateData[category][defaultSpace]?.selectedImage || "",
    );
  };

  const handleSpaceChange = (space) => {
    setSelectedSpace(space);
    setSelectedRoomTypeImg(
      realEstateData[selectedCategory][space]?.selectedImage || "",
    );
  };
  return (
    <>
      {imageToDisplay && (
        <div className="lg:container w-full mt-10 lg:mt-20 flex lg:space-x-8 px-5 lg:items-center lg:flex-row flex-col">
          <div className="relative md:w-fit w-full">
            <div className="h-full md:h-[550px] w-full md:w-[650px]">
              {selectedRoomTypeImg ? (
                <img
                  src={selectedRoomTypeImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
          <div className="lg:w-6/12 w-full lg:mt-0 mt-6">
            <h6 className="text-base">LATEST</h6>
            <Link href={`/view_all/${imageToDisplay?.id}`}>
              <h3 className="lg:text-6xl text-3xl mt-4 mb-5 cursor-pointer">
                {imageToDisplay?.name}
              </h3>
            </Link>
            <p className="mb-4">{imageToDisplay?.description}</p>
            {imageToDisplay?.frame_size && (
              <p className="mb-4">
                {imageToDisplay.frame_size.map((size, index) => (
                  <span key={index}>
                    {size.height}" x {size.width}" x {size.depth} D
                    {index < imageToDisplay.frame_size.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}
            {imageToDisplay?.colors && (
              <div className="flex gap-2 mb-4 w-full justify-start">
                {imageToDisplay?.colors.map((data, index) => (
                  <div
                    key={index}
                    className="w-[30px] h-[30px] rounded-full border"
                    style={{ backgroundColor: `${data}` }}
                  ></div>
                ))}
              </div>
            )}
            <div className="flex lg:flex-col flex-row-reverse lg:items-start w-full items-center lg:gap-0 gap-5 justify-around">
              <div className="flex w-full min-w-[200px] gap-5">
                <Select
                  onValueChange={(e) => handleSpaceChange(e)}
                  value={selectedSpace}
                >
                  <SelectTrigger className="w-full rounded-sm border-[#C8C8C8] focus:ring-0 ">
                    <SelectValue
                      placeholder="Choose Space"
                      className="w-full"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory &&
                      Object.keys(realEstateData[selectedCategory]).map(
                        (space, index) => (
                          <SelectItem
                            value={space}
                            key={index}
                          >
                            {space}
                          </SelectItem>
                        ),
                      )}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(e) => handleCategoryChange(e)}
                  defaultValue={selectedCategory}
                >
                  <SelectTrigger className="w-full rounded-sm border-[#C8C8C8] focus:ring-0 ">
                    <SelectValue
                      placeholder="Choose Room Type"
                      className="w-full"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(realEstateData).map((item, index) => (
                      <SelectItem
                        value={item}
                        key={index}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Latest;
