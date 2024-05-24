import React from "react"

import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete"
import { Button } from "@/components/ui/button"
import getURL from "@/middleware/getUrl"

import Link from "next/link"
import { FaPencil } from "react-icons/fa6"
import { useSession } from "next-auth/react"

const Actions = ({ item }) => {
  const { data: session } = useSession()
  const userRole = session?.user?.role

  const deleteRole = async (id) => {
    const res = await fetch(getURL(`/api/v1/admin/products/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })

    return await res.json()
  }

  return (
    <>
      <Link href={`/my-account/products/${item?.id}`}>
        <Button
          size="icon"
          className="me-3 bg-violet-600 hover:bg-violet-500"
        >
          <FaPencil />
        </Button>
      </Link>
      {userRole == "super_admin" && (
        <ConfirmDelete
          id={item.id}
          confirmDelete={deleteRole}
        ></ConfirmDelete>
      )}
    </>
  )
}

export default Actions
