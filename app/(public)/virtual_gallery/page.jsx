import PreviewPersonalArt from "@/components/displayInstant/PreviewPersonalArt";
import DefaultHeader from "@/components/header/DefaultHeader";
import ArtSlider from "@/components/slider/ArtSlider";
import React from "react";
import MainHeader from "./_partials/MainHeader";
import MyTopArtsGalleryCard from "./_partials/MyTopArtsGalleryCard";
import MyTopArtsLobbyAndHallwaysCard from "./_partials/MyTopArtsLobbyAndHallwaysCard";

const page = () => {
  return (
    <>
      <MainHeader></MainHeader>
      <div className="bg-black py-20">
        <MyTopArtsGalleryCard></MyTopArtsGalleryCard>
        <MyTopArtsLobbyAndHallwaysCard></MyTopArtsLobbyAndHallwaysCard>
      </div>
    </>
  );
};

export default page;
