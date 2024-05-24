import React from "react";
import NewProduct from "./partials/NewProduct";
import Questions from "@/components/questions/questions";

const page = () => {
 return (
  <div className="container mx-auto my-20">
   <div className="flex flex-col gap-20">
    <NewProduct />
    <Questions />
   </div>
  </div>
 );
};

export default page;
