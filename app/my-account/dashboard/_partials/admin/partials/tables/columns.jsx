import Actions from "./Actions"
import { Badge } from "@/components/ui/badge"
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6"

export const columns = [
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "created_at",
    header: "Data",
  },
]
