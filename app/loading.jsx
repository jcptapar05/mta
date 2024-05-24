"use client";
import React from "react";
import { Bars } from "react-loader-spinner";

const Loading = () => {
 return (
  <>
   <div className="w-screen h-screen flex justify-center items-center">
    <Bars
     height="80"
     width="80"
     color="bg-slate-800"
     ariaLabel="bars-loading"
     wrapperStyle={{}}
     wrapperClass=""
     visible={true}
    />
   </div>
  </>
 );
};

export default Loading;
