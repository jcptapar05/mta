"use client"
import dynamic from "next/dynamic"

const StepperComponent = dynamic(() => import("./RegistrationStepper"), {
  ssr: false,
})

export default StepperComponent
