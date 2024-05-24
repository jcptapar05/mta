import { Button } from "@/components/ui/button";
import Actions from "./Actions";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns = [
  {
    accessorKey: "product.name",
    header: "Wall Art",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wall Art
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          <p>{item.product.name}</p>
          <p className="text-slate-400 text-xs">
            {`${item.product.frame_size.width} " x ${item.product.frame_size.height} " x ${item.product.frame_size.depth} D`}
          </p>
        </>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          <p>x {item.quantity}</p>
        </>
      );
    },
  },
  {
    accessorKey: "user.first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          <p>
            {item.user.first_name} {item.user.last_name}
          </p>
          <p className="text-slate-400 text-xs">{item.user.job_title}</p>
          <p className="text-slate-400 text-xs">
            {item.user.company[0].company}
          </p>
        </>
      );
    },
  },
  {
    accessorKey: "survey_message",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Response
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
