"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdConstruction, MdCategory, MdOutlineDashboard } from "react-icons/md";
import { BsGear, BsPalette2 } from "react-icons/bs";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BiBarChartSquare, BiBookmark } from "react-icons/bi";
import { LiaUsersCogSolid } from "react-icons/lia";
import { HiOutlineUser } from "react-icons/hi2";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { IoImagesOutline, IoReceiptOutline } from "react-icons/io5";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/users";

const AdminDrawer = () => {
  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user?.role;
  const setuser = useUserStore((state) => state.setUser);

  const logout = async (e) => {
    signOut();

    setuser(null);

    addToCartItems([]);
  };

  const drawerItem = [
    {
      name: "My Account",
      icon: <HiOutlineUser className="text-2xl" />,
      can: ["admin", "super_admin", "artist", "customer"],
      children: [
        {
          name: "Profile",
          link: "/my-account/profile",
          icon: <MdConstruction className="text-2xl" />,
          can: ["admin", "super_admin", "artist", "customer"],
        },
        {
          name: "Addresses",
          link: "/my-account/address",
          icon: <MdCategory className="text-2xl" />,
          can: ["admin", "super_admin", "artist", "customer"],
        },
        {
          name: "Change Password",
          link: "/my-account/change-password",
          icon: <BsPalette2 className="text-2xl" />,
          can: ["admin", "super_admin", "artist", "customer"],
        },
      ],
    },
    {
      name: "Dashboard",
      link: "/my-account/dashboard",
      icon: <MdOutlineDashboard className="text-2xl" />,
      can: ["admin", "super_admin"],
    },
    {
      name: "My Artworks",
      link: "/my-account/products",
      icon: <IoImagesOutline className="text-2xl" />,
      can: ["admin", "super_admin", "artist"],
    },
    {
      name: "Products & Metrics",
      icon: <BiBarChartSquare className="text-2xl" />,
      can: ["super_admin"],
      children: [
        // {
        //   name: "Materials",
        //   link: "/my-account/materials",
        //   icon: "",
        //   can: ["super_admin"],
        // },
        {
          name: "Categories",
          link: "/my-account/categories",
          icon: "",
          can: ["super_admin"],
        },
        // {
        //   name: "Palettes",
        //   link: "/my-account/palettes",
        //   icon: "",
        //   can: ["super_admin"],
        // },
        // {
        //   name: "Room Types",
        //   link: "/my-account/room_types",
        //   icon: "",
        //   can: ["super_admin"],
        // },
        {
          name: "Frame Sizes",
          link: "/my-account/frame_sizes",
          icon: "",
          can: ["super_admin"],
        },
        {
          name: "Styles",
          link: "/my-account/styles",
          icon: "",
          can: ["super_admin"],
        },
        // {
        //   name: "Sizes and Price",
        //   link: "/my-account/size_and_price",
        //   icon: "",
        //   can: ["admin", "super_admin"],
        // },
        // {
        //   name: "Artists",
        //   link: "/my-account/artists",
        //   icon: "",
        //   can: ["super_admin"],
        // },
        // {
        //   name: "Designers",
        //   link: "/my-account/designers",
        //   icon: "",
        //   can: ["super_admin"],
        // },
      ],
    },
    {
      name: "My Non-Binding Purchase Orders",
      link: "/my-account/orders",
      icon: <IoReceiptOutline className="text-2xl" />,
      can: ["admin", "super_admin", "customer", "artist"],
      children: [
        {
          name: "All",
          link: "/my-account/orders/all",
          icon: "",
          can: ["admin", "super_admin", "artist", "customer"],
        },
        {
          name: "Pending",
          link: "/my-account/orders/pending",
          icon: "",
          can: ["admin", "super_admin", "artist", "customer"],
        },
        {
          name: "Completed",
          link: "/my-account/orders/completed",
          icon: "",
          can: ["super_admin", "admin", "super_admin", "artist", "customer"],
        },
        {
          name: "Cancelled",
          link: "/my-account/orders/cancelled",
          icon: "",
          can: ["super_admin", "admin", "super_admin", "artist", "customer"],
        },
      ],
    },
    // {
    //   name: "Product Survey",
    //   link: "/my-account/product_survey",
    //   icon: <LiaChartAreaSolid className="text-2xl" />,
    //   can: ["admin", "super_admin"],
    // },
    {
      name: "Favorites",
      link: "/my-account/favorites",
      icon: <BiBookmark className="text-2xl" />,
      can: ["admin", "super_admin", "customer", "artist"],
    },
    // {
    //   name: "Virtual Gallery Visitors",
    //   link: "/my-account/virtual_gallery_visitors",
    //   icon: <LiaUserPlusSolid className="text-2xl" />,
    //   can: ["admin", "super_admin"],
    // },
    {
      name: "Users",
      link: "/my-account/users",
      icon: <LiaUsersCogSolid className="text-2xl" />,
      can: ["admin", "super_admin"],
      children: [
        {
          name: "Users",
          link: "/my-account/users",
          icon: "",
          can: ["admin", "super_admin"],
        },
        {
          name: "Roles",
          link: "/my-account/roles",
          icon: "",
          can: ["super_admin"],
        },
      ],
    },
    {
      name: "Settings",
      link: "/my-account/settings",
      icon: <BsGear className="text-2xl" />,
      can: ["admin", "super_admin"],
      children: [
        {
          name: "FAQ's",
          link: "/my-account/faq",
          icon: "",
          can: ["admin", "super_admin"],
        },
      ],
    },
  ];
  const isPathnameIncluded = (menuItems, targetPathname) => {
    const r = menuItems.some((menuItem) => menuItem.link == targetPathname);
    console.log(r);
    return r;
  };
  return (
    <ScrollArea className="h-screen pe-4">
      <div className="pt-4 md:ps-4 appdrawer">
        {drawerItem.map((item) => (
          <div key={item.name}>
            {item?.children && (
              // with dropdown
              <Accordion
                type="single"
                collapsible
                defaultValue={
                  isPathnameIncluded(item.children, pathname) &&
                  `item-${item.name}`
                }
                className={`w-full mb-2 ${
                  !item.can.includes(user) && "hidden"
                }`}
              >
                <AccordionItem
                  value={`item-${item.name}`}
                  className="border-0"
                >
                  <AccordionTrigger className="hover:no-underline flex justify-between items-center p-4">
                    <div className="flex">
                      <div>{item.icon}</div>
                      <div className="flex justify-start px-3 text-start">
                        {item.name}
                      </div>
                    </div>
                  </AccordionTrigger>
                  {item?.children?.map((i) => (
                    <AccordionContent
                      key={i.name}
                      className={` hover:bg-gray-200 ${
                        i.link == pathname && "bg-[#d1d5db!important]"
                      }  ${!i.can.includes(user) && "hidden"}`}
                    >
                      <Link
                        href={i.link}
                        className={`py-4  ps-8 flex w-[100%] h-[100%] `}
                        style={{ fontSize: "16px" }}
                      >
                        <span className="ms-4">{i.name}</span>
                      </Link>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            )}
            {/* without dropdown */}
            {!item.children && (
              <div
                className={`w-[100%] mb-2 cursor-pointer block hover:bg-gray-100 hover:rounded-lg ${
                  pathname == item.link ? "bg bg-gray-100 rounded-lg" : ""
                } ${item.can.includes(user) ? "block" : "hidden"} `}
                key={item.name}
              >
                <Link
                  href={item.link}
                  className="px-3 py-3 flex w-[100%] items-center justify-start"
                >
                  {item.icon} <span className="ms-4">{item.name}</span>
                </Link>
              </div>
            )}
          </div>
        ))}

        {session && (
          <div className="w-[100%] my-3 cursor-pointer block hover:bg-gray-100 hover:rounded-lg">
            <Button
              onClick={() => logout()}
              className="bg-transparent text-black hover:bg-transparent text-md py-6"
            >
              <span className="me-4">
                <HiOutlineLogout className="text-2xl" />
              </span>
              Logout
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default AdminDrawer;
