import React from "react";
import AboutDescription from "./partials/AboutDescription";
import AboutModel from "./partials/AboutModel";
import ModelDescription from "./partials/ModelDescription";
import ProductReviews from "@/components/product_reviews/product_reviews";
import Suggestion from "@/components/suggestion/suggestion";

const page = () => {
 return (
  <div className="container mx-auto my-20 ">
   <div>
    <p>
     Homepage - Animals - <strong>About Product</strong>
    </p>
    <p className=" text-2xl font-extrabold">Painting</p>
    <div className="grid grid-cols-2 items-center justify-center">
     <AboutDescription />
     <AboutModel />
     <ModelDescription />
    </div>
    <div>
     <ProductReviews />
     <Suggestion />
    </div>
   </div>
  </div>
 );
};

export default page;
