/* eslint-disable @next/next/no-img-element */
"use client";

import {
 Menubar,
 MenubarCheckboxItem,
 MenubarContent,
 MenubarItem,
 MenubarMenu,
 MenubarRadioGroup,
 MenubarRadioItem,
 MenubarSeparator,
 MenubarShortcut,
 MenubarSub,
 MenubarSubContent,
 MenubarSubTrigger,
 MenubarTrigger,
} from "@/components/ui/menubar";

import React, { useState } from "react";
import Landscape from "./Landscape";
import Portrait from "./Portrait";
import SetTwo from "./SetTwo";
import SetThree from "./SetThree";

const positions = [{ position: "Landscape" }, { position: "Portrait" }, { position: "Set" }];

const SelectPosition = () => {
 const [displayPosition, setDisplayPosition] = useState("Landscape");

 const onHandlerSetPreviewPosition = (val) => {
  const index = positions.find((item) => item.position == val);

  setDisplayPosition(index.position);
 };

 return (
  <>
   <div className="flex justify-end mb-10">
    <Menubar>
     <MenubarMenu>
      <MenubarTrigger className="cursor-pointer border rounded-md">Select View</MenubarTrigger>
      <MenubarContent>
       <MenubarItem
        className="cursor-pointer"
        onClick={() => setDisplayPosition("Landscape")}
       >
        Landscape
       </MenubarItem>
       <MenubarItem
        className="cursor-pointer"
        onClick={() => setDisplayPosition("Portrait")}
       >
        Portrait
       </MenubarItem>
       <MenubarSub>
        <MenubarSubTrigger className="cursor-pointer">Set</MenubarSubTrigger>
        <MenubarSubContent>
         <MenubarItem
          className="cursor-pointer"
          onClick={() => setDisplayPosition("Set 2")}
         >
          Set 2
         </MenubarItem>
         <MenubarItem
          className="cursor-pointer"
          onClick={() => setDisplayPosition("Set 3")}
         >
          Set 3
         </MenubarItem>
        </MenubarSubContent>
       </MenubarSub>
      </MenubarContent>
     </MenubarMenu>
    </Menubar>
   </div>

   {displayPosition == "Landscape" && <Landscape></Landscape>}

   {displayPosition == "Portrait" && <Portrait></Portrait>}

   {displayPosition == "Set 2" && <SetTwo></SetTwo>}

   {displayPosition == "Set 3" && <SetThree></SetThree>}
  </>
 );
};

export default SelectPosition;
