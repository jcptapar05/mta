import React from "react"
import { FaRegImages } from "react-icons/fa6"
import { Tb360View } from "react-icons/tb"

const ProductButton = ({ show3D, toggleButton }) => {
  return (
    <button
      type="button"
      onClick={toggleButton}
    >
      {!show3D ? <Tb360View className="text-xl" /> : <FaRegImages className="text-xl" />}
    </button>
  )
}

export default ProductButton
