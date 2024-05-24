import React from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import { ShopProvider } from "@/app/_utils/ShopProvider";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <ShopProvider>
        <Navbar></Navbar>
        <div className="w-screen">{children}</div>
        <Footer></Footer>
      </ShopProvider>
    </>
  );
};

export default DefaultLayout;
