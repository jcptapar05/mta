"use client"
import React, { useEffect, useState } from "react"
import { DataTable } from "./tables/DataTable"
import { columns } from "./tables/columns"
import getURL from "@/middleware/getUrl"

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState(null)

  useEffect(() => {
    const fetchRolesData = async () => {
      const response = await fetch(getURL("/api/v1/admin/room_types"))
      const data = await response.json()

      setRoomTypes(data.room_types)
    }

    fetchRolesData()
  }, [])

  return (
    <>
      {roomTypes && (
        <DataTable
          columns={columns}
          data={roomTypes}
        />
      )}
    </>
  )
}

export default RoomTypes
