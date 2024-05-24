import React from "react";
import NewColections from "./partials/NewColections";

const page = () => {
 return (
  <div className="my-20 flex items-center justify-end relative">
   <img
    src="new_collections/background.png"
    alt=""
    className=""
   />
   <div className="absolute left-0">
    <NewColections />
   </div>
  </div>
 );
};

export default page;
