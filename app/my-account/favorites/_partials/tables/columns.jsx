/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Actions from "./Actions";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

export const columns = [
  {
    accessorKey: "productname",
    accessorFn: (row) => row.product.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="Uppercase">{row.getValue("productname")}</div>
    ),
  },
  {
    header: "Image",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          <img
            src={getAwsFilesBaseUrl(item.product.photo)}
            className="h-10 w-10 mx-auto"
          />
        </>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <>
          <Actions item={item}></Actions>
        </>
      );
    },
  },
];
