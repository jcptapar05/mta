import React from "react";
import Headers from "./_partials/headers";
import Faq from "./_partials/faq";

export const metadata = {
  title: "My Top Arts | FAQ's",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="container mx-auto my-20">
      <Headers></Headers>
      <Faq></Faq>
    </div>
  );
};

export default page;
