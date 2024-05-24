"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const Tags = () => {
  const [tags, setTags] = useState(null)

  useEffect(() => {
    const fetchTagsData = async () => {
      const response = await fetch(getURL("/api/v1/admin/tags"))
      const data = await response.json()

      setTags(data.tags)
    }

    fetchTagsData()
  }, [])

  return (
    <>
      {tags && (
        <DataTable
          columns={columns}
          data={tags}
        />
      )}
    </>
  )
}

export default Tags
