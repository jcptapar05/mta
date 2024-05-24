import React from "react";
import Cards from "./partials/Cards";
import Footer from "@/components/footer/Footer";

const page = () => {
 return (
  <>
   <div
    className="flex w-screen h-[80vh] bg-no-repeat bg-cover"
    style={{ backgroundImage: "url(./login/shop_all_login_bg.png)" }}
   >
    <div className="w-screen flex items-center justify-center">
     <Cards></Cards>
    </div>
   </div>
   <Footer></Footer>
  </>
 );
};

export default page;
