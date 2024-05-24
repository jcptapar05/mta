import React from "react";
import Forms from "./_partials/forms";
import Info from "./_partials/info";

export const metadata = {
  title: "My Top Arts | Contact us",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="container md:flex md:gap-4 my-6">
      <Info></Info>
      <Forms></Forms>
    </div>
  );
};

export default page;
