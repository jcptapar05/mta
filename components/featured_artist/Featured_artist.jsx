"use client";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
/* eslint-disable @next/next/no-img-element */
import getURL from "@/middleware/getUrl";
import React, { useEffect, useState } from "react";

const Featured_artist = ({ bgColor, bioBgColor, padding }) => {
  const [featuredArtist, setFeaturedArtist] = useState(null);

  useEffect(() => {
    const getFeaturedArtist = async () => {
      const response = await fetch(getURL(`/api/v1/public/featured_artist`));

      const data = await response.json();
      if (data.artist) {
        setFeaturedArtist(data?.artist[0]);
      }
    };

    getFeaturedArtist();
  }, []);

  return (
    <div
      className={`my-20 md:h-[700px] flex justify-center ${padding} ${bgColor}`}
    >
      {featuredArtist && (
        <div className="container">
          <div className="flex flex-col md:flex-row h-full md:w-[80%] md:gap-4 mx-auto">
            <div className="w-full md:w-1/2">
              <img
                src={getAwsFilesBaseUrl(featuredArtist.avatar)}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 justify-center -mt-44 mt md:mt-0">
              <div className="bg-gradient-to-t from-white md:bg-none from-60% opacity-80 bg-opacity-10 pt-20 md:pb-4 md:py-0 px-6 md:px-0">
                <p className="text-md md:text-lg">Featured Artist</p>
                <h1 className="text-3xl md:text-5xl">
                  {featuredArtist?.full_name}
                </h1>
                {featuredArtist.address && (
                  <p className="text-lg">{featuredArtist?.address}</p>
                )}
              </div>
              <div
                className={`bg-[#F7F7F7] md:bg-opacity-70 p-8 md:-ml-[30%] gap-4 flex flex-col ${bioBgColor}`}
              >
                <img
                  src="/featuredartist/Group.png"
                  alt=""
                  className="w-[50px]"
                />
                <p className="tracking-widest leading-8 text-md md:text-xl font-normal md:font-thin">
                  {featuredArtist?.bio}
                </p>
                <img
                  src="/featuredartist/Group2.png"
                  alt=""
                  className="w-[50px] place-self-end"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured_artist;
