import React from "react";
import Arts from "./_partial/Arts";
import Header from "./_partial/arts/Header";
import PaginatedItems from "./_partial/arts/Pagination";

export const metadata = {
  title: "My Top Arts | View All",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="mb-20">
      <Header></Header>
      {/* <Arts></Arts> */}
      <PaginatedItems />
    </div>
  );
};

export default page;
