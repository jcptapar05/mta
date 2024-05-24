"use client";
import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarTrigger,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import { useShop } from "@/app/_utils/ShopProvider";

const menuData = [
  {
    label: "Room Types",
    value: "roomTypes",
    items: [
      { label: "Entrace", value: "entrance" },
      { label: "Lobby", value: "lobby" },
      { label: "Corridor", value: "corridor" },
      { label: "Elevator lobby", value: "elevator lobby" },
      { label: "Entertainment", value: "entertainment" },
      { label: "Fitness", value: "fitness" },
      { label: "Restaurant", value: "restaurant" },
    ],
  },
  {
    label: "Category",
    value: "categories",
    items: [
      { label: "Abstract", value: "abstract" },
      { label: "Animals", value: "animals" },
      { label: "Architectural", value: "architectural" },
      { label: "Cartoon", value: "cartoon" },
      { label: "City", value: "city" },
      { label: "Creative", value: "creative" },
      { label: "Figure", value: "figure" },
      { label: "Landscape", value: "landscape" },
      { label: "Plants", value: "plants" },
      { label: "Sea & Sky", value: "sea sky" },
    ],
  },
  {
    label: "Designer",
    value: "designer",
    items: [
      { label: "Jack", value: "jack" },
      { label: "Fred", value: "fred" },
      { label: "Eva", value: "eva" },
      { label: "Leonardo", value: "leonardo" },
    ],
  },
  {
    label: "Featured Artist",
    value: "artist",
    items: [
      { label: "Bob Smith", value: "bob smith" },
      { label: "David", value: "david" },
      { label: "Frank", value: "frank" },
      { label: "Jane Smith", value: "jane smith" },
    ],
  },
  {
    label: "Color",
    value: "primaryColors",
    items: [
      { label: "Cyan", value: "D1E8E2" },
      { label: "Pastel Peach", value: "FFC3A0" },
      { label: "Spring Green", value: "33FF57" },
      { label: "Pastel Pink", value: "FFC5EA" },
    ],
  },
];

const MenuNavbar = () => {
  const [activeSub, setActiveSub] = useState(null);
  const { setSelectedFilter } = useShop();

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="text-md">Shop All</MenubarTrigger>
        <MenubarContent className="rounded-none py-6 w-[200px]">
          {menuData.map((menu) => (
            <MenubarSub key={menu.label}>
              <MenubarSubTrigger
                className={`px-8 py-1 text-md cursor-pointer ${
                  activeSub === menu.label ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
                onMouseEnter={() => setActiveSub(menu.label)}
                onMouseLeave={() => setActiveSub(null)}
              >
                {menu.label}
              </MenubarSubTrigger>
              <MenubarSubContent
                className="rounded-none py-6 w-[200px]"
                onMouseEnter={() => setActiveSub(menu.label)}
                onMouseLeave={() => setActiveSub(null)}
              >
                {menu.items.map((item) => {
                  const href = `/shop_all?type=${encodeURIComponent(
                    menu.value,
                  )}&value=${encodeURIComponent(item.value)}`;
                  return (
                    <div
                      key={item.label}
                      onClick={() => {
                        setSelectedFilter({
                          type: menu.value,
                          value: item.value,
                        });
                        window.location.href = href;
                      }}
                    >
                      <MenubarItem key={item.label}>{item.label}</MenubarItem>
                    </div>
                  );
                })}
              </MenubarSubContent>
            </MenubarSub>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuNavbar;
