import Moment from "react-moment";
import Actions from "./Actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "order.id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "order.product.name",
    accessorKey: "order.product.name",
    header: "Order Summary",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          {item.order.product.map((product, index) => (
            <p key={index}>
              {product.productToCart.name} x {product.orderDetails.quantity}
            </p>
          ))}
        </>
      );
    },
  },
  {
    accessorKey: "order.total_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      let total = 0;

      for (let i = 0; item.order?.product.length > i; i++) {
        let tempTotal =
          item?.order.product[i].orderDetails.quantity *
          item?.order.product[i].orderDetails.price;

        total += tempTotal;
      }

      return (
        <>
          <p>{Number(total).toFixed(2)}</p>
        </>
      );
    },
  },
  {
    id: "order.status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <>
          {item.order.status == "pending" && (
            <span className="text-orange-400 uppercase font-semibold">
              {item.order.status}
            </span>
          )}
          {item.order.status == "completed" && (
            <span className="text-green-600 uppercase font-semibold">
              {item.order.status}
            </span>
          )}
          {item.order.status == "cancelled" && (
            <span className="text-red-600 uppercase font-semibold">
              {item.order.status}
            </span>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "order.created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date ordered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <>
          <Moment format="MMM D, YYYY">{item.created_at}</Moment>
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
