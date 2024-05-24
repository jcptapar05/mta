"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const CompletedOrders = () => {
  const [roles, setRoles] = useState(null)

  useEffect(() => {
    const fetchRolesData = async () => {
      const response = await fetch(getURL("/api/v1/admin/order-details?status=completed"), {
        next: {
          revalidate: 0,
        },
      })

      const data = await response?.json()

      setRoles(data.orderDetails)
    }

    fetchRolesData()
  }, [])

  return (
    <>
      {roles && (
        <DataTable
          columns={columns}
          data={roles}
        />
      )}
    </>
  )
}

export default CompletedOrders
