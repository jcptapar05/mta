import React from "react";

import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";

import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import EditFrameSizes from "./EditFrameSizes";

const Actions = ({ item }) => {
  const deleteRole = async (id) => {
    const res = await fetch(getURL(`/api/v1/admin/frame_sizes/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return await res.json();
  };
  return (
    <>
      <EditFrameSizes item={item} />
      {/* <Link href={`/admin/frame_sizes/${item.id}`}>
        <Button
          size="icon"
          variant="ghost"
          className="me-3"
        >
          <FaPencil />
        </Button>
      </Link> */}
      {/* <ConfirmDelete
    id={item.id}
    confirmDelete={deleteRole}
   ></ConfirmDelete> */}
    </>
  );
};

export default Actions;
