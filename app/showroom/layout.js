import React from "react";
import { ShopProvider } from "@/app/_utils/ShopProvider";
import ShowroomNavbar from "@/components/navigation/ShowroomNavbar";
import Footer from "@/components/footer/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <ShowroomNavbar></ShowroomNavbar>
      <div className="w-screen h-screen">{children}</div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default DefaultLayout;
