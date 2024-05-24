"use client"
import React, { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import getURL from "@/middleware/getUrl"
import { useToast } from "@/components/ui/use-toast"

const Forms = () => {
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")

  const submit = async (e) => {
    e.preventDefault()

    const res = await fetch(getURL("/api/v1/admin/styles"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
      next: {
        revalidate: 0,
      },
    })

    const roles = await res.json()

    if (res.ok && !roles.error) {
      router.push("/my-account/styles")

      toast({
        title: "Successfully added!",
      })
    }
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="max-w-[450px] mx-auto"
      >
        <h2 className="font-bold text-2xl mb-8">Create new style</h2>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter tag name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
