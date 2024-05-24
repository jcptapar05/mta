"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const Tags = () => {
  const [frameSizes, setFrameSizes] = useState(null)

  useEffect(() => {
    const fetchFrameSizesData = async () => {
      const response = await fetch(getURL("/api/v1/admin/frame_sizes"))
      const data = await response.json()

      setFrameSizes(data.frame_sizes)
    }

    fetchFrameSizesData()
  }, [])

  return (
    <>
      {frameSizes && (
        <DataTable
          columns={columns}
          data={frameSizes}
        />
      )}
    </>
  )
}

export default Tags
