"use client";
import getURL from "@/middleware/getUrl";
import React, { useEffect, useState } from "react";
import Product from "./_partials/Product";
import { Skeleton } from "@/components/ui/skeleton";
import Recommendation from "@/components/recommendation/Recommendation";
import RelatedProducts from "@/components/related_products/RelatedProducts";
import Monthly_introductions from "@/components/monthly_introductions/Monthly_introductions";
import { useRouter } from "next/navigation";

const PublicProductPage = ({ params }) => {
  const id = params.id;
  const router = useRouter();

  const [product, SetProduct] = useState(null);
  const [productRelated, setProductRelated] = useState([]);
  const [sizeAndPrice, setSizeAndPrice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState("");

  if (!loading && err == "Not Found!") {
    router.push("/");
  }

  useEffect(() => {
    const getProductRelated = async () => {
      try {
        const response = await fetch(
          getURL(
            `/api/v1/public/products_related?&styles=${product?.styleId}&currentId=${product?.id}`,
          ),
        );
        const data = await response.json();

        setProductRelated(data.products);
      } catch (err) {
        console.log("Error please try reloading...");
      } finally {
        setLoading(false);
      }
    };

    const getProductSizeAndPrice = async () => {
      try {
        const response = await fetch(getURL(`/api/v1/public/frame_sizes`));
        const data = await response.json();
        // console.log(data.size_and_price);
        setSizeAndPrice(data.frame_sizes);
      } catch (err) {
        console.log("Error please try reloading...");
      } finally {
        setLoading(false);
      }
    };

    const getProduct = async () => {
      try {
        const response = await fetch(getURL(`/api/v1/public/products/${+id}`), {
          method: "GET",
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Cache-Control": "no-cache",
          },
        });

        const data = await response.json();

        SetProduct(data.product);
        setError(data?.message);
      } catch (err) {
        console.log("Error please try reloading...");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
    getProductSizeAndPrice();
    getProductRelated();
  }, [id, product?.styleId, product?.id]);

  return (
    <div>
      {loading ? (
        <div className="md:container grid grid-cols-1 md:grid-cols-2 p-4 gap-4 mb-8 mt-0 md:mb-16 md:mt-16 w-full bg-red-20">
          <div className="mb-4 flex justify-between h-[400px] md:h-[800px]">
            <Skeleton className="w-[100%] rounded-lg" />
          </div>
          <div className="mb-4 flex flex-col gap-4 justify-between h-[800px]">
            <Skeleton className="w-[60%] h-[100px] rounded-lg" />
            <Skeleton className="w-[30%] h-[100px] rounded-lg" />
            <Skeleton className="w-[25%] h-[100px] rounded-lg" />
            <Skeleton className="w-[100%] h-[100px] rounded-lg" />
            <Skeleton className="w-[100%] h-[400px] rounded-lg" />

            <Skeleton className="w-[100%] h-[100%] rounded-lg" />
            <Skeleton className="w-[100%] h-[500px] rounded-lg" />
          </div>
        </div>
      ) : (
        <Product
          product={product}
          sizeAndPrice={sizeAndPrice}
        ></Product>
      )}

      {/* <Monthly_introductions
        bgColor="md:bg-[#F6F6F6] bg-transparent"
        bioBgColor="bg-white"
        padding="py-12"
      ></Monthly_introductions> */}
      {!loading && (
        <Recommendation artist={product?.artist?.full_name}></Recommendation>
      )}
      {!loading && productRelated?.length > 0 && (
        <RelatedProducts productRelated={productRelated}></RelatedProducts>
      )}
    </div>
  );
};

export default PublicProductPage;
