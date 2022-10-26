import React, { useCallback, useEffect, useState } from "react"
import { useDrop } from "react-dnd"

import { useBlocks } from "../context"
import DropArea from "./DropArea"
import { ItemTypes } from "../ItemTypes"

const styles = {
  minWidth: 100,
  minHeight: 300,
  border: "1px solid black",
}

export default function MidArea() {
  const { addBlocks, runningBlocks, dropAreas, handleAddBlocks, addDropArea } = useBlocks()
  const [boxes, setBoxes] = useState({})
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  })
  useEffect(() => {
    // setBoxes(blocks.reduce((prev, item) => ({ ...prev, [item.id]: item }), {}))
  }, [])

  const handleDrop = useCallback(
    (item, id) => {
      if (id === null) {
        console.log("null id ")
        addDropArea({ x: pos.x - 250, y: pos.y }, item, id)
      } else {
        handleAddBlocks(item, id)
      }
    },
    [pos]
  )

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        handleDrop(item, null)
        return undefined
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      hover(item, monitor) {
        const delta = monitor.getClientOffset()
        let left = Math.round(delta.x)
        let top = Math.round(delta.y)
        setPos({ x: left, y: top })
        // console.log("delta", delta)
        // moveBox(item.id, left, top, item.bgColor)
        return undefined
      },
    }),
    [handleDrop]
  )

  // console.log("boxes", dropAreas, pos)

  const isActive = isOver
  const bg = isActive ? "bg-green-100" : "bg-white"

  return (
    <div className={` relative h-screen w-screen `}>
      <div ref={drop} className={`absolute h-full w-full ${bg}`}>
        {" "}
      </div>
      {isActive && <DropArea pos={{ y: pos.y, x: pos.x - 300 }} />}

      {Object.keys(dropAreas)?.map((id, idx) => (
        <React.Fragment key={idx}>
          <DropArea {...dropAreas[id]} onDrop={(item) => handleDrop(item, id)} />
        </React.Fragment>
      ))}
    </div>
  )
}
