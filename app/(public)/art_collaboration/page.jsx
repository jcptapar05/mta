import React from "react";
import Header from "./_partials/Header";
import SampleImgs from "./_partials/SampleImgs";
import Uploader from "./_partials/Uploader";

export const metadata = {
  title: "My Top Arts | Art Collaboration",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const ArtCollaborationPage = () => {
  return (
    <div className="container mx-auto my-20">
      <Header></Header>
      <SampleImgs></SampleImgs>
      <div className="text-center">
        <Uploader></Uploader>
      </div>
    </div>
  );
};

export default ArtCollaborationPage;
