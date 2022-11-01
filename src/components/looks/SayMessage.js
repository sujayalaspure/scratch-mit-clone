import React from "react"
import { useBlocks } from "../../context"
import runEvent from "../../Events"
import { blockType } from "../getBlockComp"

function SayMessage({ duration, message }) {
  const { currentActiveSprite } = useBlocks()

  const onPress = (e) => {
    e.stopPropagation()
    runEvent(currentActiveSprite, blockType.SAY_MESSAGE, { duration, message })
  }
  return (
    <div className="flex flex-col">
      <div className="mb-2">
        Say
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

export function MessageBox({ id }) {
  return (
    <>
      <div className="hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap" id={id + "-message-box"}></div>
      <div
        className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap"
        id={id + "-message-box1"}
      ></div>
    </>
  )
}

export default SayMessage
