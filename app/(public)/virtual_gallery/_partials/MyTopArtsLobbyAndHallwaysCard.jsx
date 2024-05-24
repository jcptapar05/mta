"use client";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSession } from "next-auth/react";
import EnterGalleryVisitor from "@/components/navigation/partials/navbar/EnterGalleryVisitor";

const MyTopArtsLobbyAndHallwaysCard = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      {/* <div className="bg-[url('/virtual-gallery/mta-lobby-and-hallways.png')] h-[420px] bg-no-repeat w-full relative bg-cover"> */}
      <div className="h-[420px] relative">
        <video
          playsInline
          autoPlay
          muted
          loop
          defaultMuted
          className="w-full h-full object-cover"
        >
          <source
            src={getAwsFilesBaseUrl(
              "/virtual_gallery/mta-hallways-and-gallery.mp4",
            )}
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>
        <div className="h-full w-full bg-black bg-opacity-40 z-2 absolute left-0 top-0"></div>
        <div className="absolute left-5 md:left-10 text-white top-10 md:top-32 pe-2 max-w-[500px]">
          <h2 className="text-2xl md:text-3xl mb-4 font-extrabold">
            My Top Arts (Lobby and Hallways)
          </h2>
          <p>
            Discover our exquisite collection in a variety of lobby and hallway
            settings, each designed to create a unique and captivating ambiance
            that enhances your art viewing experience.
          </p>
          {session || localStorage.getItem("isAllowedToEnter") ? (
            <div className="mt-8 md:mt-10 mta-button">
              <a
                href="https://vr.1clickdesign.com/mta_hallways/#autoplaP"
                target="_blank"
                className="p-4 border w-full"
              >
                <span className="me-4 transition-all">Enter Showroom</span>{" "}
                <AiOutlineArrowRight className="inline-block" />
              </a>
            </div>
          ) : (
            <div className="h-12 border border-white mt-8 md:mt-10 w-44 text-center">
              <EnterGalleryVisitor
                setOpen={setOpen}
                handleDialogClose={handleDialogClose}
                open={open}
              ></EnterGalleryVisitor>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTopArtsLobbyAndHallwaysCard;
