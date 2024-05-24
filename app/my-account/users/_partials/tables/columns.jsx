import Actions from "./Actions"

export const columns = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "first_name",
    header: "First name",
  },
  {
    accessorKey: "last_name",
    header: "Last name",
  },
  // {
  //   accessorKey: "company[0].company",
  //   header: "Company",
  // },
  {
    accessorKey: "role.name",
    header: "Role",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original

      return <Actions item={item} />
    },
  },
]
