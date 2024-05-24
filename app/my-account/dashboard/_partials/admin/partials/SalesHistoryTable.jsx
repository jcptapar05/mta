"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const SalesHistoryTable = () => {
  const [products, setProducts] = useState([
    {
      transaction_id: 1,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 2,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 3,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 4,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 5,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 6,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 7,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 8,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 9,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 10,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 11,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 11,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
    {
      transaction_id: 11,
      product: "1CD",
      quantity: 200,
      total: 1000,
      created_at: "Jan, 20, 2023",
    },
  ])

  // useEffect(() => {
  //   const fetchProductsData = async () => {
  //     const response = await fetch(getURL("/api/v1/admin/products"))
  //     const data = await response.json()

  //     setProducts(data.products)
  //   }

  //   fetchProductsData()
  // }, [])

  return (
    <>
      <div className="flex items-center justify-between mb-4 p-4">
        <p className="text-sm">
          SALES HISTORY <span className="text-xs text-gray-400">150 new orders - last updated 5 minutes ago</span>
        </p>
      </div>
      {products && (
        <DataTable
          columns={columns}
          data={products}
        />
      )}
    </>
  )
}

export default SalesHistoryTable
