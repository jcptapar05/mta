import DefaultHeader from "@/components/header/DefaultHeader";
import React from "react";
import Header from "./_partials/Header";
import Sliders from "./_partials/Sliders";
import PhoneSection from "./_partials/PhoneSection";
import ExploreOurGallery from "./_partials/ExploreOurGallery";
import Space from "./_partials/Space";
import ExploreArt from "./_partials/ExploreArt";
import VideoConferencingSenction from "./_partials/VideoConference";
import MainHeader from "./_partials/MainHeader";

export const metadata = {
  title: "My Top Arts | What we do best?",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="mx-auto">
      <MainHeader></MainHeader>
      <Header></Header>
      <Sliders></Sliders>
      <Space></Space>
      <PhoneSection></PhoneSection>
      <ExploreArt></ExploreArt>
      <VideoConferencingSenction></VideoConferencingSenction>
      <ExploreOurGallery></ExploreOurGallery>
    </div>
  );
};

export default page;
