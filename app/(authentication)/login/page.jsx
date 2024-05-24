import React from "react"
import Cards from "./partials/Cards"
import Banner from "@/components/layouts/partials/auth/Banner"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const page = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect("/my-account/dashboard")

  return (
    <div className="flex w-screen h-screen">
      <div className="container w-screen md:w-1/2 flex items-center justify-center">
        <Cards></Cards>
      </div>
      <div className="hidden md:block md:w-1/2">
        <Banner></Banner>
      </div>
    </div>
  )
}

export default page
