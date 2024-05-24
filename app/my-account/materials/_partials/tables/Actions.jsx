import React from "react";

import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";

import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

const Actions = ({ item }) => {
 const deleteRole = async (id) => {
  const res = await fetch(getURL(`/api/v1/admin/roles/${id}`), {
   method: "DELETE",
   headers: { "Content-Type": "application/json" },
  });

  return await res.json();
 };

 return (
  <>
   <Link href={`/admin/materials/${item.id}`}>
    <Button
     size="icon"
     className="me-3 bg-violet-600 hover:bg-violet-500"
    >
     <FaPencil />
    </Button>
   </Link>
   <ConfirmDelete
    id={item.id}
    confirmDelete={deleteRole}
   ></ConfirmDelete>
  </>
 );
};

export default Actions;
