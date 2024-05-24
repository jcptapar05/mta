import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HiOutlineUser } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/users";

const Account = () => {
  const { data: session } = useSession();
  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const setuser = useUserStore((state) => state.setUser);

  const logout = async (e) => {
    signOut();

    setuser(null);

    addToCartItems([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <HiOutlineUser className="text-2xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="justify-end cursor-pointer">
          <Link
            href="/my-account/profile"
            className="w-full text-end"
          >
            My Account
          </Link>
        </DropdownMenuItem>
        {session?.user.role != "customer" && session?.user.role != "artist" && (
          <DropdownMenuItem className="justify-end cursor-pointer">
            <Link
              href="/my-account/dashboard"
              className="w-full text-end"
            >
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="justify-end cursor-pointer">
          <Link
            href="/my-account/orders/all"
            className="w-full text-end"
          >
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-end cursor-pointer">
          <Link
            href="/my-account/favorites"
            className="w-full text-end"
          >
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-end cursor-pointer"
          onClick={logout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Account;
