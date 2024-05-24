import { manrope } from "@/app/fonts"
import Link from "next/link"
import React from "react"
import { Separator } from "../ui/separator"

const AdminPagesHeader = ({ title, createLink, buttonName, lastUpdateStatus }) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className={`text-2xl ${manrope.className}`}>{title}</h2>
          {lastUpdateStatus && <p className="text-gray-400 text-sm">{lastUpdateStatus}</p>}
        </div>
        {buttonName && (
          <Link
            href={`/my-account/${createLink}/create`}
            className="bg-primary text-white rounded-md py-2 hover:bg-primary/90 px-4"
          >
            {buttonName}
          </Link>
        )}
      </div>
      <Separator className="mb-4 bg-black"></Separator>
    </>
  )
}

export default AdminPagesHeader
