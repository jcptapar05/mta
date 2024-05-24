"use client"
import React, { useEffect, useState } from "react"
import { columns } from "./tables/columns"
import { DataTable } from "./tables/DataTable"
import getURL from "@/middleware/getUrl"

const Artists = () => {
  const [artists, setArtists] = useState(null)

  useEffect(() => {
    const fetchArtistsData = async () => {
      const response = await fetch(getURL("/api/v1/admin/artists"))
      const data = await response.json()

      setArtists(data.artists)
    }

    fetchArtistsData()
  }, [])

  return (
    <>
      {artists && (
        <DataTable
          columns={columns}
          data={artists}
        />
      )}
    </>
  )
}

export default Artists
