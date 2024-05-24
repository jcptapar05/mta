"use client";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import getURL from "@/middleware/getUrl";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Skeleton } from "@/components/ui/skeleton";
const Monthly_introductions = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(getURL(`/api/v1/public/products`));
      const data = await response.json();
      setProducts(data.products);
    };
    const currentDate = new Date();
    const isFirstDayOfMonth = currentDate.getDate() === 1;
    if (products === null || isFirstDayOfMonth) {
      getProducts();
    }
    setIsLoading(false);
  }, [products]);

  var settings = {
    infinite: false,
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div
      className={`my-20 md:h-[700px] flex justify-center bg-[#F6F6F6] py-2 md:py-12`}
    >
      <div className="container hidden md:flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="w-[80%] flex flex-col md:flex-row gap-10 h-full">
            <Skeleton className="w-[100%] bg-white rounded-lg " />
            <div className="w-full h-full flex justify-center gap-2 flex-col">
              <Skeleton className="w-[40%] bg-white rounded-lg h-[30px]" />
              <Skeleton className="w-[50%] bg-white rounded-lg h-[50px]" />
              <Skeleton className="w-[100%] bg-white rounded-lg h-[200px]" />
            </div>
          </div>
        ) : (
          <Slider
            {...settings}
            className="monthly-introductions-slider relative w-[80%] h-full"
          >
            {products?.map((data, index) => (
              <div
                key={index}
                className="remove-inlineblock items-center flex flex-col md:flex-row h-full md:w-[80%] md:gap-4 mx-auto"
              >
                <div className="w-full h-full md:w-1/2 flex items-end justify-end">
                  <img
                    src={getAwsFilesBaseUrl(data?.thumbnails)}
                    alt=""
                    className="object-contain w-fit h-full "
                  />
                </div>
                <div className="sample flex flex-col w-full h-fit md:w-1/2 justify-center -mt-44 md:mt-0">
                  <div className="bg-gradient-to-t from-white md:bg-none from-60% opacity-80 bg-opacity-10 pt-20 md:pb-4 md:py-0 px-6 md:px-0">
                    <p className="text-md md:text-lg uppercase">
                      Monthly Introductions
                    </p>
                    <h1 className="text-3xl md:text-5xl">{data?.name}</h1>
                  </div>
                  <div
                    className={`bg-[#ffffff] md:bg-opacity-[0.85] p-8 md:-ml-[30%] gap-4 flex flex-col`}
                  >
                    <img
                      src="/featuredartist/Group.png"
                      alt=""
                      className="w-[50px]"
                    />
                    <p className=" tracking-wide leading-8 text-base md:text-xl font-normal md:font-thin">
                      {data?.description}
                    </p>
                    <img
                      src="/featuredartist/Group2.png"
                      alt=""
                      className="w-[50px] place-self-end"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className="container flex md:hidden flex-col items-center justify-center h-fit min-h-[900px]">
        {isLoading ? (
          <div className="w-[80%] flex flex-col md:flex-row gap-10 h-full">
            <Skeleton className="w-[100%] bg-white rounded-lg " />
            <div className="w-full h-full flex justify-center gap-2 flex-col">
              <Skeleton className="w-[40%] bg-white rounded-lg h-[30px]" />
              <Skeleton className="w-[50%] bg-white rounded-lg h-[50px]" />
              <Skeleton className="w-[100%] bg-white rounded-lg h-[200px]" />
            </div>
          </div>
        ) : (
          <Slider
            {...settings}
            className="monthly-introductions-slider relative w-full h-full"
          >
            {products?.map((data, index) => (
              <div
                key={index}
                className="remove-inlineblock h-full flex-col items-center justify-center"
              >
                <div className="w-full flex flex-col h-fit max-h-96 pt-4 relative">
                  <img
                    src={getAwsFilesBaseUrl(data?.thumbnails)}
                    alt=""
                    className="object-contain w-full h-full max-h-[350px]"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white md:bg-none from-60% opacity-80 bg-opacity-10 pt-20 md:pb-4 md:py-0 px-6 md:px-0">
                    <p className="text-md md:text-lg uppercase">
                      Monthly Introductions
                    </p>
                    <h1 className="text-3xl md:text-5xl">{data?.name}</h1>
                  </div>
                </div>
                <div className="flex flex-col p-8 bg-white">
                  <img
                    src="/featuredartist/Group.png"
                    alt=""
                    className="w-[50px]"
                  />
                  <p className="tracking-wide leading-[29px] text-md md:text-xl font-normal md:font-thin">
                    {data?.description}
                  </p>
                  <img
                    src="/featuredartist/Group2.png"
                    alt=""
                    className="w-[50px] place-self-end"
                  />
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Monthly_introductions;
