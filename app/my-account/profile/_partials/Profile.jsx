/* eslint-disable @next/next/no-img-element */
"use client"

import getURL from "@/middleware/getUrl"
import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import Link from "next/link"

const UserProfile = () => {
  const { data: session } = useSession()
  const [userinfo, setUser] = useState()

  useEffect(() => {
    const getUser = async (id) => {
      const data = await fetch(getURL(`/api/v1/admin/profile/${session?.user.id}`), {
        next: {
          revalidate: 0,
        },
      })

      const user = await data.json()
      return setUser(user.user)
    }

    getUser()
  }, [])

  return (
    <Card className="mx-auto w-[400px] mt-32">
      <CardContent className="text-center py-10">
        <img
          src="https://github.com/shadcn.png"
          alt="User avatar"
          className="max-h-[180px] mx-auto mb-14 rounded-full"
        />
        <h4 className="font-bold">{userinfo?.email}</h4>
        <h4 className="mb-4">
          {userinfo?.first_name} {userinfo?.last_name}
        </h4>
        <Link href={`/my-account/profile/${userinfo?.id}/info`}>
          <Button>Update Profile</Button>
        </Link>
        <Link
          className="ms-2"
          href={`/my-account/profile/${userinfo?.id}/address`}
        >
          <Button className="bg-white text-black border hover:text-white">Update Address</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default UserProfile
