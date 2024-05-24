/* eslint-disable @next/next/no-img-element */
"use client";
import HomeLoader from "@/components/loader/HomeLoader";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import getURL from "@/middleware/getUrl";
import { motion, useInView, useAnimation } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Palette } from "color-thief-react";
import Image from "next/image";

const BrowseOurGallery = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const mainControl = useAnimation();
  const mainControl2 = useAnimation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(getURL("/api/v1/public/browse_gallery"), {
        cache: "no-store",
      });
      const data = await response.json();
      setProducts(data.products);
    };
    getProduct();
  }, []);

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    }
    if (isInView2) {
      mainControl2.start("visible");
    }
  }, [isInView, isInView2]);

  return (
    <div className="px-4 md:px-0 md:container mx-auto my-20">
      <div className="text-center mb-10">
        <p className="uppercase">Discover</p>
        <h3 className="text-3xl md:text-5xl">Browse Our Gallery</h3>
      </div>
      <div
        ref={ref}
        style={{ position: "relative", width: "100%", overflow: "hidden" }}
        className="flex flex-col md:flex-row md:space-x-5 justify-between mb-10"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1.5, y: 0 },
          }}
          initial="hidden"
          animate={mainControl}
          transition={{ duration: 1, ease: "easeIn" }}
          className="w-full md:w-5/12"
        >
          <div className="mb-10">
            <Link href={`/view_all/${products[0]?.id}`}>
              <div className="w-full h-[300px] md:h-[500px] bg-[#F6F6F6] p-10">
                {products[0]?.thumbnails && products[0]?.thumbnails != null ? (
                  <>
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[0]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  </>
                ) : (
                  <HomeLoader />
                )}
              </div>
              <div className="border-l border-[#C8C8C8]  ps-4 mt-6">
                {products && products[0] && (
                  <>
                    <h3 className="text-2xl md:text-4xl">
                      {products[0]?.name}
                    </h3>

                    {products && products[0]?.colors ? (
                      <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                        {JSON.parse(products[0]?.colors).map((row, index) => {
                          return (
                            <div
                              key={row}
                              style={{ background: row }}
                              className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                            ></div>
                          );
                        })}
                      </div>
                    ) : (
                      <Palette
                        src={getAwsFilesBaseUrl(products[0]?.thumbnails)}
                        colorCount={3}
                        format="hex"
                        crossOrigin="anonymous"
                        quality={10}
                      >
                        {({ data, loading, error }) => {
                          // Check for errors
                          if (error) {
                            console.error("Error:", error);
                            return null; // or render an error message
                          }

                          // Check if data is still loading
                          if (loading) {
                            return <div>Loading...</div>;
                          }

                          return (
                            <div className="flex gap-2 justify-start mt-2">
                              {data?.map((item, index) => (
                                <div
                                  key={index}
                                  style={{ background: item }}
                                  className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                ></div>
                              ))}
                            </div>
                          );
                        }}
                      </Palette>
                    )}
                  </>
                )}
              </div>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-8 md:mb-0">
            <div className="w-full sm:w-1/2">
              <Link href={`/view_all/${products[1]?.id}`}>
                <div className="h-[300px] md:h-[200px] p-4 bg-[#F6F6F6] mb-4 ">
                  {products[1]?.thumbnails &&
                  products[1]?.thumbnails != null ? (
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[1]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  ) : (
                    <HomeLoader />
                  )}
                </div>
                <div className="border-l border-[#C8C8C8] ps-4">
                  {products && products[1] && (
                    <>
                      <h3 className="text-2xl md:text-2xl">
                        {products[1]?.name}
                      </h3>
                      {products && products[1]?.colors ? (
                        <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                          {JSON.parse(products[1]?.colors).map((row, index) => {
                            return (
                              <div
                                key={row}
                                style={{ background: row }}
                                className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                              ></div>
                            );
                          })}
                        </div>
                      ) : (
                        <Palette
                          src={getAwsFilesBaseUrl(products[1]?.thumbnails)}
                          colorCount={3}
                          format="hex"
                          crossOrigin="anonymous"
                          quality={10}
                        >
                          {({ data, loading, error }) => {
                            // Check for errors
                            if (error) {
                              console.error("Error:", error);
                              return null; // or render an error message
                            }

                            // Check if data is still loading
                            if (loading) {
                              return <div>Loading...</div>;
                            }

                            return (
                              <div className="flex gap-2 justify-start mt-2">
                                {data?.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{ background: item }}
                                    className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                  ></div>
                                ))}
                              </div>
                            );
                          }}
                        </Palette>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </div>
            <div className="w-full sm:w-1/2 ">
              <Link href={`/view_all/${products[2]?.id}`}>
                <div className="h-[300px] md:h-[200px] bg-[#F6F6F6] p-4 mb-4 ">
                  {products && products[2] && (
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[2]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  )}
                </div>
                <div className="border-l border-[#C8C8C8]  ps-4">
                  {products && (
                    <>
                      <h3 className="text-2xl md:text-2xl">
                        {products[2]?.name}
                      </h3>
                      {products && products[2]?.colors ? (
                        <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                          {JSON.parse(products[2]?.colors).map((row, index) => {
                            return (
                              <div
                                key={row}
                                style={{ background: row }}
                                className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                              ></div>
                            );
                          })}
                        </div>
                      ) : (
                        <Palette
                          src={getAwsFilesBaseUrl(products[2]?.thumbnails)}
                          colorCount={3}
                          format="hex"
                          crossOrigin="anonymous"
                          quality={10}
                        >
                          {({ data, loading, error }) => {
                            // Check for errors
                            if (error) {
                              console.error("Error:", error);
                              return null; // or render an error message
                            }

                            // Check if data is still loading
                            if (loading) {
                              return <div>Loading...</div>;
                            }

                            return (
                              <div className="flex gap-2 justify-start mt-2">
                                {data?.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{ background: item }}
                                    className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                  ></div>
                                ))}
                              </div>
                            );
                          }}
                        </Palette>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 200 },
            visible: { opacity: 3, y: 0 },
          }}
          initial="hidden"
          animate={mainControl}
          transition={{ duration: 2, ease: "easeIn" }}
          className="w-full md:w-7/12 ps-0"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <Link href={`/view_all/${products[3]?.id}`}>
                <div className="h-[300px] md:h-[200px] bg-[#F6F6F6] p-4 mb-4 ">
                  {products[3]?.thumbnails &&
                  products[3]?.thumbnails != null ? (
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[3]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  ) : (
                    <HomeLoader />
                  )}
                </div>
                <div className="border-l border-[#C8C8C8] ps-4">
                  {products && products[3] && (
                    <>
                      <h3 className="text-2xl md:text-2xl">
                        {products[3]?.name}
                      </h3>
                      {products && products[3]?.colors ? (
                        <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                          {JSON.parse(products[3]?.colors).map((row, index) => {
                            return (
                              <div
                                key={row}
                                style={{ background: row }}
                                className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                              ></div>
                            );
                          })}
                        </div>
                      ) : (
                        <Palette
                          src={getAwsFilesBaseUrl(products[3]?.thumbnails)}
                          colorCount={3}
                          format="hex"
                          crossOrigin="anonymous"
                          quality={10}
                        >
                          {({ data, loading, error }) => {
                            // Check for errors
                            if (error) {
                              console.error("Error:", error);
                              return null; // or render an error message
                            }

                            // Check if data is still loading
                            if (loading) {
                              return <div>Loading...</div>;
                            }

                            return (
                              <div className="flex gap-2 justify-start mt-2">
                                {data?.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{ background: item }}
                                    className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                  ></div>
                                ))}
                              </div>
                            );
                          }}
                        </Palette>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </div>
            <div className="w-full sm:w-1/2">
              <Link href={`/view_all/${products[4]?.id}`}>
                <div className="h-[300px] md:h-[200px] bg-[#F6F6F6] p-4 mb-4 ">
                  {products[4]?.thumbnails &&
                  products[4]?.thumbnails != null ? (
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[4]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  ) : (
                    <HomeLoader />
                  )}
                </div>
                <div className="border-l border-[#C8C8C8] ps-4">
                  {products && products[4] && (
                    <>
                      <h3 className="text-2xl md:text-2xl">
                        {products[4]?.name}
                      </h3>
                      {products && products[4]?.colors ? (
                        <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                          {JSON.parse(products[4]?.colors).map((row, index) => {
                            return (
                              <div
                                key={row}
                                style={{ background: row }}
                                className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                              ></div>
                            );
                          })}
                        </div>
                      ) : (
                        <Palette
                          src={getAwsFilesBaseUrl(products[4]?.thumbnails)}
                          colorCount={3}
                          format="hex"
                          crossOrigin="anonymous"
                          quality={10}
                        >
                          {({ data, loading, error }) => {
                            // Check for errors
                            if (error) {
                              console.error("Error:", error);
                              return null; // or render an error message
                            }

                            // Check if data is still loading
                            if (loading) {
                              return <div>Loading...</div>;
                            }

                            return (
                              <div className="flex gap-2 justify-start mt-2">
                                {data?.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{ background: item }}
                                    className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                  ></div>
                                ))}
                              </div>
                            );
                          }}
                        </Palette>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <Link href={`/view_all/${products[5]?.id}`}>
              <div className="w-full h-[300px] md:h-[500px] bg-[#F6F6F6] p-10">
                {products[5]?.thumbnails && products[5]?.thumbnails != null ? (
                  <Image
                    width={500}
                    height={500}
                    src={getAwsFilesBaseUrl(products[5]?.thumbnails)}
                    alt=""
                    className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                  />
                ) : (
                  <HomeLoader />
                )}
              </div>
              <div className="border-l border-[#C8C8C8] ps-4 mt-6">
                {products && products[5] && (
                  <>
                    <h3 className="text-2xl md:text-4xl">
                      {products[5]?.name}
                    </h3>
                    {products && products[5]?.colors ? (
                      <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                        {JSON.parse(products[5]?.colors).map((row, index) => {
                          return (
                            <div
                              key={row}
                              style={{ background: row }}
                              className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                            ></div>
                          );
                        })}
                      </div>
                    ) : (
                      <Palette
                        src={getAwsFilesBaseUrl(products[5]?.thumbnails)}
                        colorCount={3}
                        format="hex"
                        crossOrigin="anonymous"
                        quality={10}
                      >
                        {({ data, loading, error }) => {
                          // Check for errors
                          if (error) {
                            console.error("Error:", error);
                            return null; // or render an error message
                          }

                          // Check if data is still loading
                          if (loading) {
                            return <div>Loading...</div>;
                          }

                          return (
                            <div className="flex gap-2 justify-start mt-2">
                              {data?.map((item, index) => (
                                <div
                                  key={index}
                                  style={{ background: item }}
                                  className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                ></div>
                              ))}
                            </div>
                          );
                        }}
                      </Palette>
                    )}
                  </>
                )}
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
      {/* Second */}
      <div
        ref={ref2}
        style={{ position: "relative", width: "100%", overflow: "hidden" }}
        className="flex flex-col md:flex-row md:space-x-5 justify-between"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1.5, y: 0 },
          }}
          initial="hidden"
          animate={mainControl2}
          transition={{ duration: 1, ease: "easeIn" }}
          className="w-full md:w-5/12"
        >
          <div className="mb-10">
            <Link href={`/view_all/${products[6]?.id}`}>
              <div className="w-full h-[300px] md:h-[500px] bg-[#F6F6F6]  p-10">
                {products[6]?.thumbnails && products[6]?.thumbnails != null ? (
                  <Image
                    width={500}
                    height={500}
                    src={getAwsFilesBaseUrl(products[6]?.thumbnails)}
                    alt=""
                    className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                  />
                ) : (
                  <HomeLoader />
                )}
              </div>
              <div className="border-l border-[#C8C8C8] ps-4 mt-6">
                {products && products[6] && (
                  <>
                    <h3 className="text-2xl md:text-4xl">
                      {products[6]?.name}
                    </h3>
                    {products && products[6]?.colors ? (
                      <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                        {JSON.parse(products[6]?.colors).map((row, index) => {
                          return (
                            <div
                              key={row}
                              style={{ background: row }}
                              className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                            ></div>
                          );
                        })}
                      </div>
                    ) : (
                      <Palette
                        src={getAwsFilesBaseUrl(products[6]?.thumbnails)}
                        colorCount={3}
                        format="hex"
                        crossOrigin="anonymous"
                        quality={10}
                      >
                        {({ data, loading, error }) => {
                          // Check for errors
                          if (error) {
                            console.error("Error:", error);
                            return null; // or render an error message
                          }

                          // Check if data is still loading
                          if (loading) {
                            return <div>Loading...</div>;
                          }

                          return (
                            <div className="flex gap-2 justify-start mt-2">
                              {data?.map((item, index) => (
                                <div
                                  key={index}
                                  style={{ background: item }}
                                  className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                ></div>
                              ))}
                            </div>
                          );
                        }}
                      </Palette>
                    )}
                  </>
                )}
              </div>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full sm:w-1/2 ">
              <Link href={`/view_all/${products[7]?.id}`}>
                <div className="h-[300px] md:h-[200px] bg-[#F6F6F6] p-4 mb-4 ">
                  {products[7]?.thumbnails &&
                  products[7]?.thumbnails != null ? (
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[7]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  ) : (
                    <HomeLoader />
                  )}
                </div>
                <div className="border-l border-[#C8C8C8] ps-4">
                  {products && products[7] && (
                    <>
                      <h3 className="text-2xl md:text-2xl">
                        {products[7]?.name}
                      </h3>
                      {products && products[7]?.colors ? (
                        <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                          {JSON.parse(products[7]?.colors).map((row, index) => {
                            return (
                              <div
                                key={row}
                                style={{ background: row }}
                                className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                              ></div>
                            );
                          })}
                        </div>
                      ) : (
                        <Palette
                          src={getAwsFilesBaseUrl(products[7]?.thumbnails)}
                          colorCount={3}
                          format="hex"
                          crossOrigin="anonymous"
                          quality={10}
                        >
                          {({ data, loading, error }) => {
                            // Check for errors
                            if (error) {
                              console.error("Error:", error);
                              return null; // or render an error message
                            }

                            // Check if data is still loading
                            if (loading) {
                              return <div>Loading...</div>;
                            }

                            return (
                              <div className="flex gap-2 justify-start mt-2">
                                {data?.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{ background: item }}
                                    className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                  ></div>
                                ))}
                              </div>
                            );
                          }}
                        </Palette>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </div>
            <div className="w-full sm:w-1/2 ">
              <Link href={`/view_all/${products[8]?.id}`}>
                <div className="h-[300px] md:h-[200px] bg-[#F6F6F6] p-4 mb-4 ">
                  {products[8]?.thumbnails &&
                  products[8]?.thumbnails != null ? (
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[8]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  ) : (
                    <HomeLoader />
                  )}
                </div>
                <div className="border-l border-[#C8C8C8] ps-4">
                  {products && products[8] && (
                    <>
                      <h3 className="text-2xl md:text-2xl">
                        {products[8]?.name}
                      </h3>
                      {products && products[8]?.colors ? (
                        <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                          {JSON.parse(products[8]?.colors).map((row, index) => {
                            return (
                              <div
                                key={row}
                                style={{ background: row }}
                                className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                              ></div>
                            );
                          })}
                        </div>
                      ) : (
                        <Palette
                          src={getAwsFilesBaseUrl(products[8]?.thumbnails)}
                          colorCount={3}
                          format="hex"
                          crossOrigin="anonymous"
                          quality={10}
                        >
                          {({ data, loading, error }) => {
                            // Check for errors
                            if (error) {
                              console.error("Error:", error);
                              return null; // or render an error message
                            }

                            // Check if data is still loading
                            if (loading) {
                              return <div>Loading...</div>;
                            }

                            return (
                              <div className="flex gap-2 justify-start mt-2">
                                {data?.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{ background: item }}
                                    className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                  ></div>
                                ))}
                              </div>
                            );
                          }}
                        </Palette>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 200 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControl2}
          transition={{ duration: 2, ease: "easeIn" }}
          className="w-full md:w-7/12"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-10 md:mt-0">
            <div className="w-full sm:w-1/2 ">
              <Link href={`/view_all/${products[9]?.id}`}>
                <div className="h-[300px] md:h-[200px] bg-[#F6F6F6] p-4 mb-4 ">
                  {products[9]?.thumbnails &&
                  products[9]?.thumbnails != null ? (
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[9]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  ) : (
                    <HomeLoader />
                  )}
                </div>
                <div className="border-l border-[#C8C8C8] ps-4">
                  {products && products[9] && (
                    <>
                      <h3 className="text-2xl md:text-2xl">
                        {products[9]?.name}
                      </h3>
                      {products && products[9]?.colors ? (
                        <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                          {JSON.parse(products[9]?.colors).map((row, index) => {
                            return (
                              <div
                                key={row}
                                style={{ background: row }}
                                className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                              ></div>
                            );
                          })}
                        </div>
                      ) : (
                        <Palette
                          src={getAwsFilesBaseUrl(products[9]?.thumbnails)}
                          colorCount={3}
                          format="hex"
                          crossOrigin="anonymous"
                          quality={10}
                        >
                          {({ data, loading, error }) => {
                            // Check for errors
                            if (error) {
                              console.error("Error:", error);
                              return null; // or render an error message
                            }

                            // Check if data is still loading
                            if (loading) {
                              return <div>Loading...</div>;
                            }

                            return (
                              <div className="flex gap-2 justify-start mt-2">
                                {data?.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{ background: item }}
                                    className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                  ></div>
                                ))}
                              </div>
                            );
                          }}
                        </Palette>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </div>
            <div className="w-full sm:w-1/2">
              <Link href={`/view_all/${products[10]?.id}`}>
                <div className="h-[300px] md:h-[200px] bg-[#F6F6F6] p-4 mb-4 ">
                  {products[10]?.thumbnails &&
                  products[10]?.thumbnails != null ? (
                    <Image
                      width={500}
                      height={500}
                      src={getAwsFilesBaseUrl(products[10]?.thumbnails)}
                      alt=""
                      className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                    />
                  ) : (
                    <HomeLoader />
                  )}
                </div>
                <div className="border-l border-[#C8C8C8] ps-4">
                  {products && products[10] && (
                    <>
                      <h3 className="text-2xl md:text-2xl">
                        {products[10]?.name}
                      </h3>
                      {products && products[10]?.colors ? (
                        <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                          {JSON.parse(products[10]?.colors).map(
                            (row, index) => {
                              return (
                                <div
                                  key={row}
                                  style={{ background: row }}
                                  className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                ></div>
                              );
                            },
                          )}
                        </div>
                      ) : (
                        <Palette
                          src={getAwsFilesBaseUrl(products[10]?.thumbnails)}
                          colorCount={3}
                          format="hex"
                          crossOrigin="anonymous"
                          quality={10}
                        >
                          {({ data, loading, error }) => {
                            // Check for errors
                            if (error) {
                              console.error("Error:", error);
                              return null; // or render an error message
                            }

                            // Check if data is still loading
                            if (loading) {
                              return <div>Loading...</div>;
                            }

                            return (
                              <div className="flex gap-2 justify-start mt-2">
                                {data?.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{ background: item }}
                                    className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                  ></div>
                                ))}
                              </div>
                            );
                          }}
                        </Palette>
                      )}
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <Link href={`/view_all/${products[11]?.id}`}>
              <div className="w-full h-[300px] md:h-[500px] bg-[#F6F6F6]  p-10">
                {products[11]?.thumbnails &&
                products[11]?.thumbnails != null ? (
                  <Image
                    width={500}
                    height={500}
                    src={getAwsFilesBaseUrl(products[11]?.thumbnails)}
                    alt=""
                    className="mx-auto h-full w-fit object-contain hover:scale-105 hover:shadow-xl transition-all "
                  />
                ) : (
                  <HomeLoader />
                )}
              </div>
              <div className="border-l border-[#C8C8C8] ps-4 mt-6">
                {products && products[11] && (
                  <>
                    <h3 className="text-2xl md:text-4xl">
                      {products[11]?.name}
                    </h3>
                    {products && products[11]?.colors ? (
                      <div className="flex justify-start items-center gap-2 mb-4 mt-2">
                        {JSON.parse(products[11]?.colors).map((row, index) => {
                          return (
                            <div
                              key={row}
                              style={{ background: row }}
                              className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                            ></div>
                          );
                        })}
                      </div>
                    ) : (
                      <Palette
                        src={getAwsFilesBaseUrl(products[11]?.thumbnails)}
                        colorCount={3}
                        format="hex"
                        crossOrigin="anonymous"
                        quality={10}
                      >
                        {({ data, loading, error }) => {
                          // Check for errors
                          if (error) {
                            console.error("Error:", error);
                            return null; // or render an error message
                          }

                          // Check if data is still loading
                          if (loading) {
                            return <div>Loading...</div>;
                          }

                          return (
                            <div className="flex gap-2 justify-start mt-2">
                              {data?.map((item, index) => (
                                <div
                                  key={index}
                                  style={{ background: item }}
                                  className="h-7 border w-7 md:w-7 md:h-7 rounded-full"
                                ></div>
                              ))}
                            </div>
                          );
                        }}
                      </Palette>
                    )}
                  </>
                )}
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseOurGallery;
