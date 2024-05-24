/* eslint-disable @next/next/no-img-element */
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

const Landscape = () => {
 const [file, setFile] = useState(null);

 const onPreviewImage = (e) => {
  if (e.target.files?.[0]) {
   setFile(URL.createObjectURL(e.target.files[0]));
  } else {
   setFile(null);
  }
 };

 const removePreviewImg = () => {
  setFile(null);
 };

 return (
  <div className="flex justify-center items-center relative">
   <img
    src="./frames/frame.png"
    alt=""
    className="w-[100%] mx-auto relative"
   />

   <div className="absolute top-24 w-[100%] h-[100%] max-w-[540px] left-auto max-h-[400px]">
    <div className="relative">
     {!file && (
      <div className="absolute z-[1] top-44 left-44 max-w-[200px] items-center mx-auto">
       <Label
        htmlFor="uploadfile"
        className="bg-slate-200 z-10 py-2 px-10 rounded-2xl cursor-pointer shadow-md"
       >
        Upload image
       </Label>
       <Input
        id="uploadfile"
        type="file"
        onChange={onPreviewImage}
        className="hidden"
       />
      </div>
     )}

     {file && (
      <img
       src={file}
       alt="Preview Image"
       className="absolute top-0 left-0 z-[-1] h-screen w-screen max-h-[420px] max-w-[560px] object-cover"
      />
     )}

     {file && (
      <div className="absolute z-10 top-10 right-12 text-white">
       <button
        className="py-1 px-3 bg-white text-black rounded-full shadow-xl"
        type="button"
        onClick={removePreviewImg}
       >
        x
       </button>
      </div>
     )}
    </div>
   </div>

   <div className="absolute text-white bottom-20 left-10">
    <h2 className="text-5xl mb-3">Display your painting instantly.</h2>
    <p>Realistically present your art prints and designs using our selection of stylish mockup scenes</p>
   </div>
  </div>
 );
};

export default Landscape;
