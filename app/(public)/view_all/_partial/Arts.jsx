import React from "react";
import Filter from "./arts/Filter";
import Lists from "./arts/Lists";
import Header from "./arts/Header";
import { Separator } from "@/components/ui/separator";

const Arts = () => {
 return (
  <div className="container mx-auto">
   {/* <Filter></Filter> */}
   <Lists></Lists>
  </div>
 );
};

export default Arts;
