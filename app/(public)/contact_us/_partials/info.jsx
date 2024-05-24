import React from "react";
import { FaFacebook, FaGoogle, FaSkype, FaTwitter } from "react-icons/fa6";

const Info = () => {
  return (
    <div className="w-full h-[70vh] md:w-5/12 bg-black text-white p-5 md:p-12 mt-10 md:mt-0">
      <p className="text-2xl mb-8">Contact Info</p>
      <p>Address</p>
      <p className="mb-7">
        <span className="w-full block">My Top Arts, LLC,</span>
        <span className="w-full block">9701 Wilshire Blvd., 10th floor,</span>
        <span className="w-full block">Beverly Hills, California 90212</span>
      </p>
      <p>Office</p>
      <p className="mb-7">(+1) 310 859 8200</p>
      <p>Email</p>
      <p className="mb-7">
        <a
          href="mailto:info@mytoparts.com"
          className="text-orange-500 cursor-pointer"
        >
          info@mytoparts.com
        </a>
      </p>
      {/* <p>Customer Care Available</p>
      <p>Monday-Friday 7:30 AM- 4:30 PM PST</p> */}

      <div className="mt-8 md:mt-14 flex space-x-5">
        <FaFacebook className="hover:text-orange-300 cursor-pointer" />
        <FaGoogle className="hover:text-orange-300 cursor-pointer" />
        <FaSkype className="hover:text-orange-300 cursor-pointer" />
        <FaTwitter className="hover:text-orange-300 cursor-pointer" />
      </div>
    </div>
  );
};

export default Info;
