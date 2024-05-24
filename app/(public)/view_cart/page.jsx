import React from "react";
import YourOrder from "./_partials/YourOrder";
import OrderSummary from "./_partials/OrderSummary";

export const metadata = {
  title: "My Top Arts | View Cart",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="container mx-auto my-10 md:min-h-[500px] flex-col flex justify-between md:flex-row gap-8">
      <YourOrder />
      <OrderSummary />
    </div>
  );
};

export default page;
