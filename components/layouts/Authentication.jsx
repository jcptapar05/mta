import React from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";

const Authentication = ({ children }) => {
 return (
  <>
   <Navbar></Navbar>
   <div className="flex justify-center items-center">{children}</div>
   <Footer></Footer>
  </>
 );
};

export default Authentication;
