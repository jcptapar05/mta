"use client";

import React from "react";
import { CreditCard, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

import { useSession, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/users";

const Appbar = () => {
  const router = useRouter();
  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const { data: session } = useSession();
  const setuser = useUserStore((state) => state.setUser);

  const logout = async (e) => {
    signOut();

    setuser(null);

    addToCartItems([]);
  };

  return (
    <div className="w-[100%] border-b-2 py-2 bg-slate-50 shadow-sm flex justify-end items-center px-10">
      <span className="mr-6">{session?.user?.email}</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>1CD</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuLabel>{session?.user?.role}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer block w-[100%]">
              <Link
                className="flex w-[100%]"
                href="/admin/profile"
              >
                <User className="mr-2 h-4 w-4" />
                <span className="block w-[100%]">Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Carts</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Appbar;
