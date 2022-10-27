import React from "react"
import { useDrop } from "react-dnd"
import { useBlocks } from "../context"
import runEvent from "../Events"
import { ItemTypes } from "../ItemTypes"
import getComponent, { blockType } from "./getBlockComp"

function DropArea({ onDrop, blocks, pos }) {
  const { currentActiveSprite, setCurrentActiveSprite } = useBlocks()

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  )

  const handlePlay = (e) => {
    console.log("play")

    e.stopPropagation()
    if (blocks.length === 0) return
    let i = 0
    const interval = setInterval(() => {
      console.log("interval", i)
      const { type, params } = blocks[i]
      if (type === blockType.TURN) {
        const ang = params.direction === "left" ? -1 * params.degrees : params.degrees
        setCurrentActiveSprite((prev) => ({
          ...prev,
          angle: prev.angle + ang,
        }))
      }
      runEvent(currentActiveSprite, type, params)
      i++
      if (i >= blocks.length) clearInterval(interval)
    }, 1000)
  }

  const isActive = isOver
  const bg = isActive ? "bg-green-100" : canDrop ? "bg-red-100" : "bg-white"

  return (
    <div
      ref={drop}
      className={`max-w-sm w-max border border-dashed border-gray-400  absolute rounded overflow-hidden shadow-lg ${bg} items-center flex flex-col`}
      style={{
        top: pos.y + "px",
        left: pos.x + "px",
      }}
    >
      <div
        className="m-2 mb-10 flex flex-col items-center"
        style={{
          minHeight: 200,
          minWidth: 170,
        }}
      >
        {blocks?.map(({ type, params }, index) => (
          <React.Fragment key={index}> {getComponent(type, { ...params })}</React.Fragment>
        ))}
      </div>
      {/* <button
        onClick={handlePlay}
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mx-2 mb-2 rounded"
      >
        Play
      </button> */}
    </div>
  )
}

export default DropArea
