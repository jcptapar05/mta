import React from "react";

import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";

import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import EditUser from "./EditUser";

const Actions = ({ item }) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const deleteRole = async (id) => {
    const res = await fetch(getURL(`/api/v1/admin/roles/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return await res.json();
  };

  return (
    <>
      {/* <Link href={`/my-account/users/${item.id}`}>
        <Button
          size="icon"
          variant="ghost"
          className="me-3 "
        >
          <FaPencil />
        </Button>
      </Link> */}
      <EditUser item={item} />
      {/* {userRole == "super_admin" && (
        <ConfirmDelete
          id={item.id}
          confirmDelete={deleteRole}
        ></ConfirmDelete>
      )} */}
    </>
  );
};

export default Actions;
