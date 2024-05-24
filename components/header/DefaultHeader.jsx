import React from "react";

const DefaultHeader = ({ title, excerpt }) => {
 return (
  <div className="text-center">
   <h1 className="text-5xl font-bold mb-3">{title}</h1>
   <p>{excerpt}</p>
  </div>
 );
};

export default DefaultHeader;
