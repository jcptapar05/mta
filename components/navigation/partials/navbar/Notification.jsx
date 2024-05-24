"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdNotificationsOutline } from "react-icons/io";
import getURL from "@/middleware/getUrl";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const Notification = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const response = await fetch(getURL(`/api/v1/admin/notifications`));
      const data = await response.json();
      setItems((prev) => (prev = data.notifications));
    };

    getNotifications();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <IoMdNotificationsOutline className="text-2xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[200px] p-2">
        {items?.length <= 0 && <p>No new notifications</p>}
        {items?.length > 0 && (
          <ScrollArea className="max-h-72">
            {items?.map((item) => (
              <div
                key={item.id}
                className="border-b py-2 w-full"
              >
                <Link
                  href={"/my-account/orders/pending"}
                  className="block"
                >
                  {item.user.first_name + " " + item.user.last_name} purchase
                  art work with order number of {item.order.id}
                </Link>
              </div>
            ))}
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
