import Actions from "./Actions";

export const columns = [
 {
  accessorKey: "id",
  header: "ID",
 },
 {
  accessorKey: "name",
  header: "Name",
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
