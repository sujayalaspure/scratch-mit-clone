import React from "react"
import { useBlocks } from "../../context"
import runEvent from "../../Events"
import { blockType } from "../getBlockComp"
import Icon from "../Icon"

export const TurnDirection = {
  LEFT: "left",
  RIGHT: "right",
}

function Turn({ direction, degrees }) {
  const { currentActiveSprite } = useBlocks()

  const onPress = (e) => {
    e.stopPropagation()
    runEvent(currentActiveSprite, blockType.TURN, { direction, degrees })
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-2 items-center">
        Turn
        <Icon name={TurnDirection.LEFT === direction ? "undo" : "redo"} size={15} className="text-white ml-2" />
        <span className="mx-2 bg-white text-black px-2 rounded-lg">{degrees}</span> degrees
      </div>
      <button onClick={onPress} className="bg-blue-800 hover:bg-blue-700 text-white py-1 rounded">
        Play
      </button>
    </div>
  )
}

export default Turn
