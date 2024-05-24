/* eslint-disable @next/next/no-img-element */
import { manrope } from "@/app/fonts";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Palette } from "color-thief-react";

const List = ({ product, hidePrice, hideSize, hideCart, variant }) => {
  const addToLocalStorage = (product) => {
    const storedCart = localStorage.getItem("cart");
    let cart = storedCart ? JSON.parse(storedCart) : [];

    if (!Array.isArray(cart)) {
      cart = [];
    }

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newItem = { ...product, quantity: 1 };
      const updatedCart = [...cart, newItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const variantStyles = {
    default: {
      container: "p-4 h-[360px] cursor-pointer",
      title: "font-bold text-2xl",
      price: "font-bold text-2xl",
      palette: "",
    },
    compact: {
      container: "p-4 h-[360px] cursor-pointer",
      title: " font-bold text-2xl text-center",
      price: "font-bold text-2xl",
      palette: "flex content-center w-full items-center justify-center",
    },
  };

  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <div className="border-b-2 pb-2">
      <div className={`${styles.container} flex justify-center items-center`}>
        <Link href={`/view_all/${product.id}`}>
          {product?.thumbnails ? (
            <img
              src={getAwsFilesBaseUrl(product?.thumbnails)}
              alt="Artist avatar"
              className="transition-transform transform hover:scale-105 hover:shadow-xl max-h-[350px]"
              style={{
                width: "fit-content",
                height: "fit-content",
                objectFit: "contain",
              }}
            />
          ) : product.photo && product.photo[0] ? (
            <img
              src={getAwsFilesBaseUrl(product.photo[0])}
              alt="Shop all header arts background"
              sizes="100vw"
              className="transition-transform transform hover:scale-105 hover:shadow-xl max-h-[350px]"
              style={{
                width: "fit-content",
                height: "fit-content",
                objectFit: "contain",
              }}
            />
          ) : (
            <img
              src={getAwsFilesBaseUrl(product.photo)}
              alt="Shop all header arts background"
              sizes="100vw"
              className="hover:scale-105 hover:shadow-xl max-h-[350px]"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </Link>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="w-full text-center">
          <h3 className={`${styles.title}`}>{product.name}</h3>
        </div>
      </div>

      {product && product.colors ? (
        <div className="flex justify-center items-center gap-2 mb-4 mt-2">
          {JSON.parse(product.colors).map((row, index) => {
            return (
              <div
                key={row}
                style={{ background: row }}
                className="border w-7 h-7 rounded-full"
              ></div>
            );
          })}
        </div>
      ) : (
        <Palette
          src={getAwsFilesBaseUrl(product.thumbnails)}
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
              <div className="flex gap-2 justify-center mt-2">
                {data?.map((item, index) => (
                  <div
                    key={index}
                    style={{ background: item }}
                    className="border w-7 h-7 rounded-full"
                  ></div>
                ))}
              </div>
            );
          }}
        </Palette>
      )}
    </div>
  );
};

export default List;
