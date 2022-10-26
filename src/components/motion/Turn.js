import React from "react"
import Icon from "../Icon"

export const TurnDirection = {
  LEFT: "left",
  RIGHT: "right",
}

function Turn({ direction, degrees }) {
  return (
    <>
      Turn
      <Icon name={TurnDirection.LEFT === direction ? "undo" : "redo"} size={15} className="text-white ml-2" />
      <span className="mx-2 bg-white text-black px-2 rounded-lg">{degrees}</span> degrees
    </>
  )
}

export default Turn
