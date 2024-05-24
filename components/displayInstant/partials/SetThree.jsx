/* eslint-disable @next/next/no-img-element */
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

const SetThree = () => {
 const [fileOne, setFileOne] = useState(null);
 const [fileTwo, setFileTwo] = useState(null);
 const [fileThree, setFileThree] = useState(null);

 const onPreviewImageOne = (e) => {
  if (e.target.files?.[0]) {
   setFileOne(URL.createObjectURL(e.target.files[0]));
  } else {
   setFileOne(null);
  }
 };

 const onPreviewImageTwo = (e) => {
  if (e.target.files?.[0]) {
   setFileTwo(URL.createObjectURL(e.target.files[0]));
  } else {
   setFileTwo(null);
  }
 };

 const onPreviewImageThree = (e) => {
  if (e.target.files?.[0]) {
   setFileThree(URL.createObjectURL(e.target.files[0]));
  } else {
   setFileThree(null);
  }
 };

 const removePreviewImgOne = () => {
  setFileOne(null);
 };

 const removePreviewImgTwo = () => {
  setFileTwo(null);
 };

 const removePreviewImgThree = () => {
  setFileThree(null);
 };

 return (
  <div className="flex justify-center items-center relative">
   <img
    src="./frames/frameSetThree.png"
    alt=""
    className="w-[100%] mx-auto relative"
   />

   <div className="absolute top-20 w-[100%] h-[100%] max-w-[290px] left-60 max-h-[580px]">
    <div className="relative">
     {!fileOne && (
      <div className="absolute z-[1] top-44 left-14 items-center mx-auto">
       <Label
        htmlFor="uploadfileOne"
        className="bg-slate-200 z-10 py-2 px-10 rounded-2xl cursor-pointer shadow-md"
       >
        Upload image
       </Label>
       <Input
        id="uploadfileOne"
        type="file"
        onChange={onPreviewImageOne}
        className="hidden"
       />
      </div>
     )}

     {fileOne && (
      <img
       src={fileOne}
       alt="Preview Image"
       className="absolute top-0 left-0 z-[-1] h-screen w-screen max-h-[580px] max-w-[290px] object-cover"
      />
     )}

     {fileOne && (
      <div className="absolute z-10 top-8 right-8 text-white">
       <button
        className="py-1 px-3 bg-white text-black rounded-full shadow-xl"
        type="button"
        onClick={removePreviewImgOne}
       >
        x
       </button>
      </div>
     )}
    </div>
   </div>

   <div className="absolute top-20 w-[100%] h-[100%] max-w-[290px] left-auto max-h-[580px]">
    <div className="relative">
     {!fileTwo && (
      <div className="absolute z-[1] top-44 left-14 items-center mx-auto">
       <Label
        htmlFor="uploadfileTwo"
        className="bg-slate-200 z-10 py-2 px-10 rounded-2xl cursor-pointer shadow-md"
       >
        Upload image
       </Label>
       <Input
        id="uploadfileTwo"
        type="file"
        onChange={onPreviewImageTwo}
        className="hidden"
       />
      </div>
     )}

     {fileTwo && (
      <img
       src={fileTwo}
       alt="Preview Image"
       className="absolute top-0 left-0 z-[-1] h-screen w-screen max-h-[580px] max-w-[290px] object-cover"
      />
     )}

     {fileTwo && (
      <div className="absolute z-10 top-8 right-8 text-white">
       <button
        className="py-1 px-3 bg-white text-black rounded-full shadow-xl"
        type="button"
        onClick={removePreviewImgTwo}
       >
        x
       </button>
      </div>
     )}
    </div>
   </div>

   <div className="absolute top-20 w-[100%] h-[100%] max-w-[290px] right-60 max-h-[580px]">
    <div className="relative">
     {!fileThree && (
      <div className="absolute z-[1] top-44 left-14 items-center mx-auto">
       <Label
        htmlFor="uploadfileThree"
        className="bg-slate-200 z-10 py-2 px-10 rounded-2xl cursor-pointer shadow-md"
       >
        Upload image
       </Label>
       <Input
        id="uploadfileThree"
        type="file"
        onChange={onPreviewImageThree}
        className="hidden"
       />
      </div>
     )}

     {fileThree && (
      <img
       src={fileThree}
       alt="Preview Image"
       className="absolute top-0 left-0 z-[-1] h-screen w-screen max-h-[580px] max-w-[290px] object-cover"
      />
     )}

     {fileThree && (
      <div className="absolute z-10 top-8 right-8 text-white">
       <button
        className="py-1 px-3 bg-white text-black rounded-full shadow-xl"
        type="button"
        onClick={removePreviewImgThree}
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

export default SetThree;
