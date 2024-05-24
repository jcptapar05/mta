/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Separator } from "../ui/separator";
import Notification from "./partials/navbar/Notification";
import Account from "./partials/navbar/Account";
import Cart from "./partials/navbar/Cart";
import LoginDialog from "./partials/navbar/LoginDialog";
import { IoIosMenu } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import Search from "./partials/navbar/Search";
import AdminDrawerMobile from "./AdminDrawerMobile";
import { OurVirtualGallery } from "./partials/navbar/OurVirtualGallery";
import getURL from "@/middleware/getUrl";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/users";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartId = useCartStore((state) => state.setCartId);

  const setuser = useUserStore((state) => state.setUser);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const logout = async (e) => {
    signOut();

    setuser(null);

    addToCartItems([]);
  };

  const getCartItems = async () => {
    const res = await fetch(getURL("/api/v1/public/carts"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 0,
      },
    });

    const data = await res.json();

    let newItems;

    if (data.cart != null) {
      setCartId(data.cart.id);
      const itemsToAdd = data.cart.cartItems.filter((responseItem) => {
        // Check if there is no item in cartItems that matches the conditions
        const itemDoesNotExist = !cartItems.some(
          (cartItem) =>
            cartItem.productToCart.id === responseItem.productToCart.id &&
            cartItem.orderDetails?.frameCanvasSize ===
              responseItem.orderDetails?.frameCanvasSize &&
            cartItem.orderDetails?.frameCanvasThick ===
              responseItem.orderDetails?.frameCanvasThick,
        );

        return itemDoesNotExist;
      });

      newItems = [...cartItems, ...itemsToAdd];
      addToCartItems(newItems);
    }
  };

  useEffect(() => {
    getCartItems();

    const UpdateDatabase = async (items) => {
      const user = useUserStore.getState().user;
      if (user) {
        const res = await fetch(getURL("/api/v1/public/carts"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: items }),
          next: {
            revalidate: 0,
          },
        });
      }
    };

    UpdateDatabase(cartItems);

    // console.log(session?.user);
    if (session) {
      // console.log(session?.user);
      setuser(session?.user);
    }
  }, [session]);

  const sidebarItems = [
    { name: "View all", link: "/view_all", icon: "" },
    { name: <OurVirtualGallery></OurVirtualGallery> },
    { name: "What we do best?", link: "/what_we_do_best", icon: "" },
    { name: "Tailor-Made Decor", link: "/tailor_made_decor", icon: "" },
    { name: "Art Collaboration", link: "/art_collaboration", icon: "" },
  ];

  const userIsLogout = [{ name: "Register", link: "/register", icon: "" }];

  return (
    <nav
      className="flex flex-row align-center items-center justify-between px-4 md:px-0 md:justify-around"
      style={{
        background: "#f6f6f6",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="py-2">
        <Link
          className="text-black hover:text-orange-600"
          href="/"
        >
          <img
            src="/MTALogo.png"
            alt="MTA Logo"
            className="w-[90px] h-auto"
          />
        </Link>
      </div>
      <ul className="md:flex items-center flex-row align-center h-full hidden">
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center ${item.userIsLoggedIn && "hidden"}`}
          >
            {item.link && (
              <Link
                className={`px-3 h-[90px] hover:bg-gray-200 text-[14px] flex items-center ${
                  pathname == item.link && "navactive"
                }`}
                href={item.link}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}{" "}
                {item.name}
              </Link>
            )}

            {!item.link && item.name}
          </li>
        ))}
      </ul>
      <div className="hidden md:flex space-x-5 items-center">
        {!session && (
          <LoginDialog
            setOpen={setOpen}
            handleDialogClose={handleDialogClose}
            open={open}
          ></LoginDialog>
        )}

        {!session && (
          <Separator
            orientation="vertical"
            className="border h-8 border-#c8c8c8"
          ></Separator>
        )}
        <ul className="md:flex flex-row align-center space-x-2">
          {!session &&
            userIsLogout.map((item, i) => (
              <li
                key={i}
                className={`${item.userIsLoggedIn && "hidden"}`}
              >
                <Link
                  className={`px-3 h-[90px] hover:bg-gray-200 flex items-center ${
                    pathname == item.link && "navactive"
                  }`}
                  href={item.link}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}{" "}
                  {item.name}
                </Link>
              </li>
            ))}

          {session && (
            <li className="flex space-x-4">
              {session && session?.user?.role == "super_admin" && (
                <Notification></Notification>
              )}
              <Account></Account>
            </li>
          )}
        </ul>

        <Cart></Cart>
        <Search></Search>
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="flex md:hidden space-x-5 items-center">
        <div className="flex gap-x-3">
          <Cart></Cart>
        </div>
        <div className="flex md:hidden">
          <Sheet className="backdrop-blur-none">
            <SheetTrigger
              asChild
              className="cursor-pointer "
            >
              <div>
                <IoIosMenu size={32} />
              </div>
            </SheetTrigger>
            <SheetContent className="p-0">
              <div className="h-[78px] bg-white"></div>
              <div className="bg-black text-center py-3 border-0">
                <p className="text-xl font-thin text-white">Menu</p>
              </div>

              {session && (
                <div className="flex w-full">
                  <SheetClose asChild>
                    <AdminDrawerMobile></AdminDrawerMobile>
                  </SheetClose>
                </div>
              )}

              {!session && (
                <div className="flex w-full">
                  <div className="w-1/2">
                    <div className="w-full h-full bg-white flex items-center justify-center hover:bg-gray-200 text-black border-r border-black text-md">
                      <LoginDialog
                        setOpen={setOpen}
                        handleDialogClose={handleDialogClose}
                        open={open}
                      ></LoginDialog>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <SheetClose asChild>
                      <Link
                        href="/register"
                        className="bg-red-400 w-full"
                      >
                        <Button className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 bg-white hover:bg-gray-200 text-black border-l border-black py-8 text-md">
                          Register
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              )}

              <div className="h-full bg-white bg-opacity-90">
                <ul className="md:hidden flex flex-col align-center">
                  {sidebarItems.map((item) => (
                    <li
                      key={item.name}
                      className={`flex w-100 items-center ${
                        item.userIsLoggedIn && "hidden"
                      }`}
                    >
                      {item.link && (
                        <SheetClose asChild>
                          <Link
                            className={`w-full py-4 pe-6 hover:bg-gray-200 flex items-center justify-end ${
                              pathname == item.link && "navactive"
                            }`}
                            href={item.link}
                          >
                            {item.icon && (
                              <span className="mr-2">{item.icon}</span>
                            )}{" "}
                            {item.name}
                          </Link>
                        </SheetClose>
                      )}

                      {!item.link && item.name}
                    </li>
                  ))}
                </ul>

                {session && (
                  <div className="w-[100%] my-3 cursor-pointer block hover:bg-gray-100 hover:rounded-lg text-end">
                    <Button
                      onClick={() => logout()}
                      className="bg-transparent hover:bg-transparent text-md py-6 text-red-400"
                    >
                      Log Out
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div>
          <Search></Search>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
