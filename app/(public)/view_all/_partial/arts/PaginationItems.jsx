/* eslint-disable @next/next/no-img-element */
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Palette } from "color-thief-react";
import getURL from "@/middleware/getUrl";
import Image from "next/image";

const PaginationItems = ({ currentItems }) => {
  // const [product, setProduct] = useState([]);

  // const [imgSrc, setImgSrc] = useState("");

  // const { data: colrs } = usePalette(imgSrc, 10, "hex", {
  //   crossOrigin: "*",
  //   quality: 10,
  // });

  // const colorsSplice = [];

  // if (colrs?.length > 0) {
  //   for (let i = 0; 3 > i; i++) {
  //     colorsSplice.push(colrs[i]);
  //   }
  // }

  const saveColor = async (data, id) => {
    const formData = new FormData();
    // console.log(id);
    formData.append("colors", JSON.stringify(data));

    const res = await fetch(
      getURL(`/api/v1/admin/products_color_picker/${id}`),
      {
        method: "PATCH",
        body: formData,
      },
    );

    if (res.ok) {
      console.log("Success!");
    }
  };

  return (
    <>
      {currentItems.length > 0 ? (
        <div className="md:container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
          {currentItems &&
            currentItems.map((item, index) => (
              <Link
                href={`/view_all/${item.id}`}
                key={index}
                className="border-b border-[#ABABAB] pb-2 flex flex-col justify-between group"
              >
                <div className="md:px-8 h-[300px] flex">
                  <Image
                    width={500}
                    height={500}
                    src={getAwsFilesBaseUrl(item?.thumbnails)}
                    alt=""
                    quality={80}
                    priority={true}
                    className="w-full object-contain max-h-[300px] m-auto group-hover:scale-105 group-hover:shadow-xl transition-all"
                  />
                </div>
                <div>
                  <div className="mt-4 flex justify-center">
                    <div className="w-full text-center">
                      <h3 className="font-bold text-[24px]">{item.name}</h3>
                    </div>
                  </div>

                  {item &&
                  item.colors != null &&
                  JSON.parse(item.colors).length > 0 ? (
                    <div className="mt-4 flex justify-center items-center gap-2">
                      {JSON.parse(item.colors).map((row, index) => {
                        return (
                          <div
                            key={row}
                            style={{ background: row }}
                            className="h-7 border w-7 rounded-full"
                          ></div>
                        );
                      })}
                    </div>
                  ) : (
                    <Palette
                      src={getAwsFilesBaseUrl(item?.thumbnails)}
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

                        if (data.length > 0) {
                          saveColor(data, item.id);
                        }

                        return (
                          <div className="flex gap-2 justify-center">
                            {data?.map((item, index) => (
                              <div
                                key={index}
                                style={{ background: item }}
                                className="h-7 border w-7 rounded-full"
                              ></div>
                            ))}
                          </div>
                        );
                      }}
                    </Palette>
                  )}
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className="text-center my-20">
          <p className="text-4xl font-medium">No art work found!</p>
        </div>
      )}
    </>
  );
};

export default PaginationItems;
