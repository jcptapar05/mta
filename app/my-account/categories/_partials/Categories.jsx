"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const Categories = () => {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const fetchRolesData = async () => {
      const response = await fetch(getURL("/api/v1/admin/categories"), {
        cache: "no-cache",
      })
      const data = await response.json()

      setCategories(data.categories)
    }

    fetchRolesData()
  }, [])

  return (
    <>
      {categories && (
        <DataTable
          columns={columns}
          data={categories}
        />
      )}
    </>
  )
}

export default Categories
