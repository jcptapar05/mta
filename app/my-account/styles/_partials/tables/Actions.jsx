"use client";

import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import EditForm from "./EditStyles";

const Actions = ({ item }) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const deleteRole = async (id) => {
    const res = await fetch(getURL(`/api/v1/admin/styles/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 0,
      },
    });
    const data = await res.json();

    return data;
  };

  return (
    <>
      {/* <Link href={`/admin/styles/${item.id}`}>
        <Button
          size="icon"
          variant="ghost"
          className="me-3"
        >
          <FaPencil />
        </Button>
      </Link> */}
      <EditForm item={item}></EditForm>
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
