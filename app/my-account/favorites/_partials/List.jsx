/* eslint-disable @next/next/no-img-element */
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import React from "react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import getURL from "@/middleware/getUrl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const List = ({ item, itemId }) => {
  const deleteRole = async (id) => {
    const res = await fetch(getURL(`/api/v1/admin/favorites/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: false }),
      next: {
        revalidate: 0,
      },
    });
    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="border-b">
          <div className="bg-[#F6F6F6] p-4 h-[200px]">
            <Link href={`/view_all/${item.id}`}>
              <img
                src={getAwsFilesBaseUrl(item.thumbnails)}
                alt=""
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
          <div className="text-center py-4">
            <h2 className="font-bold text-xl">{item.name}</h2>
            <div className="flex gap-x-1 justify-center mt-2">
              {item &&
                item.colors != null &&
                JSON.parse(item?.colors).map((color, index) => (
                  <div
                    key={index}
                    className={`h-5 w-5 border rounded-full`}
                    style={{ background: `${color}` }}
                  ></div>
                ))}
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          inset
          className="p-0"
        >
          <Button
            onClick={() => deleteRole(itemId)}
            variant="ghost"
            className="w-full"
          >
            Remove favorite
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default List;
