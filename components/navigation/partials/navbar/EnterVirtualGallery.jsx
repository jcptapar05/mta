import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EnterVirtualGallery = () => {
  const pathname = usePathname();

  const checker =
    pathname == "/virtual_gallery/my-top-arts-lobby-and-hallways" ||
    pathname == "/virtual_gallery/my-top-arts-gallery";

  return (
    <DropdownMenu className="h-[70px] ">
      <DropdownMenuTrigger
        className={`focus:outline-none h-[90px] hover:bg-gray-200 px-3 ${
          checker && "navactive"
        }`}
      >
        Our Virtual Gallery
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none bg-gray-200 mt-[-4px] md:ms-[58px]">
        <DropdownMenuItem className="justify-end cursor-pointer py-4">
          <Link
            href="/virtual_gallery/my-top-arts-lobby-and-hallways"
            className="w-full"
          >
            My Top Arts (Lobby &copy; Hallways)
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-end cursor-pointer py-4">
          <Link
            href="/virtual_gallery/my-top-arts-gallery"
            className="w-full"
          >
            My Top Arts Gallery
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EnterVirtualGallery;
