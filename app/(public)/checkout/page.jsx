import React from "react";
import Checkout from "./_partials/Checkout";
import Total from "./_partials/Total";

export const metadata = {
  title: "My Top Arts | Checkout",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="container mx-auto my-16 min-h-[500px] flex justify-between gap-8 md:flex-row flex-col-reverse">
      <Checkout />
      <Total />
    </div>
  );
};

export default page;
