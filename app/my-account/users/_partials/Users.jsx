"use client"

import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const Users = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(getURL("/api/v1/admin/users"))
      const data = await response.json()

      setUsers(data.users)
    }

    fetchUserData()
  }, [])

  return (
    <>
      {users && (
        <DataTable
          columns={columns}
          data={users}
        />
      )}
    </>
  )
}

export default Users
