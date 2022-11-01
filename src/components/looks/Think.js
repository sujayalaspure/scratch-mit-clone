import React from "react"
import { useBlocks } from "../../context"
import runEvent from "../../Events"
import { blockType } from "../getBlockComp"

function Think({ duration, message }) {
  const { currentActiveSprite } = useBlocks()

  const onPress = (e) => {
    e.stopPropagation()
    runEvent(currentActiveSprite, blockType.THINK, { duration, message })
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        Think
        <span className="mx-2 bg-white text-black px-2 rounded-lg">{message}</span>
        {duration && (
          <>
            for
            <span className="mx-2 bg-white text-black px-2 rounded-lg">{duration}</span> seconds
          </>
        )}
      </div>
      <button onClick={onPress} className="bg-indigo-800 hover:bg-indigo-700 text-white py-1 rounded">
        Play
      </button>
    </div>
  )
}

export default Think
