import React from "react"

const Scene = ({ scenelink }) => {
  return (
    <div className="container mt-8 h-[80vh] w-full">
      <iframe
        src={scenelink}
        frameborder="0"
        className="h-full w-full"
      ></iframe>
    </div>
  )
}

export default Scene
