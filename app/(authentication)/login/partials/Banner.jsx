import React from "react";
import Image from "next/image";

const Banner = () => {
 return (
  <Image
   src="https://www.ngv.vic.gov.au/wp-content/uploads/2022/09/Top-Arts-VT-installation.jpg"
   alt="bg"
   className="w-screen h-screen object-cover"
   placeholder="blur"
  />
 );
};

export default Banner;
