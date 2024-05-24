"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const Styles = () => {
  const [styles, setStyles] = useState(null)

  useEffect(() => {
    const fetchStylesData = async () => {
      const response = await fetch(getURL("/api/v1/admin/styles"), {
        next: {
          revalidate: 0,
        },
      })
      const data = await response.json()

      setStyles(data.styles)
    }

    fetchStylesData()
  }, [])

  return (
    <>
      {styles && (
        <DataTable
          columns={columns}
          data={styles}
        />
      )}
    </>
  )
}

export default Styles
