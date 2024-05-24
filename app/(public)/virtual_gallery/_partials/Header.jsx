import { playfairdisplay } from "@/app/fonts";
import React from "react";

const Header = ({ title, description, subHeaderTitle }) => {
  return (
    <div className="text-center">
      <h1 className={`text-4xl mb-4 ${playfairdisplay.className}`}>
        <span className={`block ${playfairdisplay.className}`}>{title}</span>{" "}
        <span className={`block ${playfairdisplay.className}`}>
          {subHeaderTitle}
        </span>
      </h1>
      <p className="text-xl">{description}</p>
    </div>
  );
};

export default Header;
