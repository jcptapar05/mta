"use client"
import React, { useEffect, useState } from "react"
import { columns } from "./tables/columns"
import { DataTable } from "./tables/DataTable"
import getURL from "@/middleware/getUrl"

const Materials = () => {
  const [materials, setMaterials] = useState(null)

  useEffect(() => {
    const fetchMaterialsData = async () => {
      const response = await fetch(getURL("/api/v1/admin/materials"))
      const data = await response.json()

      setMaterials(data.materials)
    }

    fetchMaterialsData()
  }, [])

  return (
    <>
      {materials && (
        <DataTable
          columns={columns}
          data={materials}
        />
      )}
    </>
  )
}

export default Materials
