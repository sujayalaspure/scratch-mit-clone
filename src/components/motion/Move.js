import React from "react"
import { useBlocks } from "../../context"
import runEvent from "../../Events"
import { blockType } from "../getBlockComp"

export const moveDir = {
  X: "X",
  Y: "Y",
}

function Move({ direction, steps }) {
  const { currentActiveSprite } = useBlocks()

  const onPress = (e) => {
    e.stopPropagation()
    runEvent(currentActiveSprite, blockType.MOVE, { direction, steps })
  }
  return (
    <div className="flex flex-col">
      <div className="mb-2">
        Move {direction ? direction : moveDir.X}{" "}
        <span className="mx-2 bg-white text-black px-2 rounded-lg">{steps}</span> steps
      </div>
      <button onClick={onPress} className="bg-blue-800 hover:bg-blue-700 text-white py-1 rounded">
        Play
      </button>
    </div>
  )
}

export default Move
