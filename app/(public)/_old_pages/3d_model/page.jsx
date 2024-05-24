import React from "react";
import ThreeDModelPartial from "./partials/3d_model_partial";
import ThreedModelInfo from "./partials/3d_model_info";
const page = () => {
 return (
  <div className="w-full h-screen px-32 mx-auto mt-8">
   <div className="w-full flex flex-row  items-center h-[80%]">
    <ThreedModelInfo />
    <ThreeDModelPartial />
   </div>
  </div>
 );
};

export default page;
