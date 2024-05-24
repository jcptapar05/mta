/* eslint-disable @next/next/no-img-element */
import Actions from "./Actions";
import { Badge } from "@/components/ui/badge";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

export const columns = [
  {
    accessorKey: "name",
    // header: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "price",
  //   // header: "Price",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Price
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "quantity",
  //   // header: "Quantity",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Quantity
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    id: "active",
    header: "Active",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <>
          {item.active && (
            <FaCircleCheck className="mx-auto text-2xl text-green-500" />
          )}
          {!item.active && (
            <FaCircleXmark className="mx-auto text-2xl text-red-500" />
          )}
        </>
      );
    },
  },
  {
    id: "images",
    header: "Image",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          {item?.thumbnails ? (
            <img
              src={getAwsFilesBaseUrl(item?.thumbnails)}
              alt="Artist avatar"
              className="h-[50px] w-[50px] object-cover mx-auto rounded-full"
            />
          ) : item.photo && item.photo[0] ? (
            <img
              src={getAwsFilesBaseUrl(item?.photo[0])}
              alt="Artist avatar"
              className="h-[50px] w-[50px] object-cover mx-auto rounded-full"
            />
          ) : (
            <img
              src={getAwsFilesBaseUrl(item?.photo)}
              alt="Artist avatar"
              className="h-[50px] w-[50px] object-cover mx-auto rounded-full"
            />
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;

      return <Actions item={item} />;
    },
  },
];
