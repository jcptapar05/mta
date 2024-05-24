import React from "react";
import { ShopProvider } from "@/app/_utils/ShopProvider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <ShopProvider>
        <Navbar></Navbar>
        <div className="w-screen min-h-[70vh]">{children}</div>
        <Footer></Footer>
      </ShopProvider>
    </>
  );
};

export default DefaultLayout;
