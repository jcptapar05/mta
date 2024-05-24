import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function OurVirtualGallery() {
  // const handleClick = (itemName) => {
  //   window.open(`/showroom/mta?item=${encodeURIComponent(itemName)}`, "_blank");
  // };

  return (
    <div className="w-full">
      {/* Navigation Menu */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-[14px] font-normal hover:bg-transparent">
              Our Virtual Galleries
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-1 w-[200px] lg:w-[240px]">
                <li
                  className="hover:bg-gray-200 w-full h-full rounded-sm cursor-pointer p-1.5"
                  // onClick={() => handleClick("lobby_and_hallways")}
                >
                  <Link
                    href="/showroom/my_top_arts"
                    // target="_blank"
                    className="w-full h-full rounded-sm cursor-pointer block text-[14px]"
                  >
                    My Top Arts
                  </Link>
                </li>
                <li
                  className="hover:bg-gray-200 w-full h-full rounded-sm cursor-pointer p-1.5"
                  // onClick={() => handleClick("lobby_and_hallways")}
                >
                  <Link
                    href="/showroom/gallery"
                    // target="_blank"
                    className="w-full h-full rounded-sm cursor-pointer block text-[14px]"
                  >
                    My Top Arts Gallery
                  </Link>
                </li>
                <li
                  className="hover-bg-gray-200 w-full h-full rounded-sm cursor-pointer p-1.5"
                  // onClick={() => handleClick("gallery")}
                >
                  <Link
                    href="/showroom/lobby_and_hallways"
                    // target="_blank"
                    className="w-full h-full rounded-sm cursor-pointer block text-[14px]"
                  >
                    My Top Arts Lobby and Hallways
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        className="w-full flex justify-end md:hidden border-b-0 manrope font-normal"
      >
        <AccordionItem
          value="item-1"
          className="text-end w-full border-b-0 manrope font-normal"
        >
          <AccordionTrigger className="text-end manrope font-normal justify-end pe-4 gap-2 w-full hover:no-underline border-b-0 hover:bg-gray-200">
            Our Virtual Galleries
          </AccordionTrigger>
          <AccordionContent>
            <ul className="p-1 w-full">
              <li
                className="hover:bg-gray-200 w-full h-full rounded-sm cursor-pointer px-2 py-4"
                // onClick={() => handleClick("My Top Arts Gallery")}
              >
                <Link
                  href="/showroom/my_top_arts"
                  // target="_blank"
                  className="w-full h-full rounded-sm cursor-pointer block text-[14px]"
                >
                  My Top Arts
                </Link>
              </li>
              <li
                className="hover:bg-gray-200 w-full h-full rounded-sm cursor-pointer px-2 py-4"
                // onClick={() => handleClick("My Top Arts Gallery")}
              >
                <Link
                  href="/showroom/gallery"
                  // target="_blank"
                  className="w-full h-full rounded-sm cursor-pointer block text-[14px]"
                >
                  My Top Arts Gallery
                </Link>
              </li>
              <li
                className="hover:bg-gray-200 w-full h-full rounded-sm cursor-pointer px-2 py-4"
                // onClick={() => handleClick("My Top Arts Lobby and Hallways")}
              >
                <Link
                  href="/showroom/lobby_and_hallways"
                  // target="_blank"
                  className="w-full h-full rounded-sm cursor-pointer block text-[14px]"
                >
                  My Top Arts Lobby and Hallways
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
