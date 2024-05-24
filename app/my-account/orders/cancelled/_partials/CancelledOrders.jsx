"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const PendingOrders = () => {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    const fetchCancelledOrdersData = async () => {
      const response = await fetch(getURL("/api/v1/admin/order-details?status=cancelled"), {
        next: {
          revalidate: 0,
        },
      })

      const data = await response?.json()

      setOrders(data.orderDetails)
    }

    fetchCancelledOrdersData()
  }, [])

  return (
    <>
      {orders && (
        <DataTable
          columns={columns}
          data={orders}
        />
      )}
    </>
  )
}

export default PendingOrders
