import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BsSignStopFill } from "react-icons/bs";
import { manrope, playfairdisplay } from "./fonts";

const NotFound = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="h-[80vh] w-screen flex justify-center items-center">
        <div className="text-center">
          {/* <BsSignStopFill className="mx-auto mb-20 text-9xl" /> */}
          <h1
            className={`mb-6 text-9xl font-extrabold flex items-start mx-auto justify-center ${playfairdisplay.className}`}
          >
            404
          </h1>
          <h2 className="text-5xl mb-5">Ooops... page not found</h2>
          <p className="max-w-[600px]">
            Apologies, you've entered a place where art hasn't yet bloomed.
            Let's guide you back to the masterpiece you were seeking.
          </p>
          <Button
            variant="outlinePrimary"
            className="mt-10 uppercase"
          >
            <Link href="/">Back to home </Link>
          </Button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default NotFound;
