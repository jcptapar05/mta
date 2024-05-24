"use client"
import React, { useEffect, useState } from "react"

const ZustandHydration = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false)
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return <>{isHydrated ? <div>{children}</div> : null}</>
}

export default ZustandHydration
