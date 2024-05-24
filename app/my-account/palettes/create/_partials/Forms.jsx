"use client"

import React, { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import getURL from "@/middleware/getUrl"

const Forms = () => {
  const router = useRouter()

  const [name, setName] = useState("")
  const [hexcode, setHexcode] = useState("")

  const submit = async (e) => {
    e.preventDefault()

    const res = await fetch(getURL("/api/v1/admin/palettes"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, hexcode }),
    })

    const user = await res.json()

    if (!user.error) {
      router.push("/my-account/palettes")
    }
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="max-w-[450px] mx-auto"
      >
        <h2 className="font-bold text-2xl mb-8">Create new palettes</h2>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter color name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter color hexcode"
              value={hexcode}
              onChange={(e) => setHexcode(e.target.value)}
            />
          </div>
        </div>
        <div className="text-end">
          <Button className="px-20">Create</Button>
        </div>
      </form>
    </>
  )
}

export default Forms
