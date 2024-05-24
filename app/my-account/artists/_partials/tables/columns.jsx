/* eslint-disable @next/next/no-img-element */
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import Actions from "./Actions";

export const columns = [
  {
    accessorKey: "first_name",
    header: "First name",
  },
  {
    accessorKey: "last_name",
    header: "Last name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    id: "images",
    header: "Image",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <>
          <img
            src={getAwsFilesBaseUrl(item.avatar)}
            alt="Artist avatar"
            className="h-[50px] w-[50px] object-cover mx-auto rounded-full"
          />
        </>
      );
    },
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const item = row.original;

  //     return <Actions item={item} />;
  //   },
  // },
];
