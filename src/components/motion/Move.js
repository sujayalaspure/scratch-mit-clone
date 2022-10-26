import React from "react"

export const moveDir = {
  X: "X",
  Y: "Y",
}

function Move({ direction, steps }) {
  return (
    <div>
      Move {direction ? direction : moveDir.X} <span className="mx-2 bg-white text-black px-2 rounded-lg">{steps}</span>{" "}
      steps
    </div>
  )
}

export default Move
