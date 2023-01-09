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
  const { addBlocks, updateDropAreaPos, dropAreas, handleAddBlocks, addDropArea } = useBlocks()
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    isVisible: false,
  })
  useEffect(() => {
    // setBoxes(blocks.reduce((prev, item) => ({ ...prev, [item.id]: item }), {}))
  }, [])

  const handleDrop = useCallback(
    (type, item, id) => {
      if (type === ItemTypes.BOX) {
        if (id === null) {
          addDropArea({ x: pos.x - 250, y: pos.y }, item, id)
        } else {
          handleAddBlocks(item, id)
        }
      } else if (type === ItemTypes.DROP_AREA) {
        console.log("drop area", item)
        updateDropAreaPos(item.id, { x: pos.x, y: pos.y })
      }
    },
    [pos]
  )

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX, ItemTypes.DROP_AREA],
      drop(item, monitor) {
        console.log("drop", item.pos, monitor.getItemType())
        // if (monitor.getItemType() === ItemTypes.DROP_AREA) {
        //   const delta = monitor.getDifferenceFromInitialOffset()
        //   console.log("delta", delta)
        //   let left = Math.round(item.pos.x + delta.x)
        //   let top = Math.round(item.pos.y + delta.y)
        //   updateDropAreaPos(item.id, { x: left, y: top })
        // } else {
        // }
        handleDrop(monitor.getItemType(), item, null)
        setPos((prev) => ({ ...prev, isVisible: false }))
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
        setPos({ x: left, y: top, isVisible: monitor.getItemType() === ItemTypes.BOX })
        // console.log("delta", delta)
        // moveBox(item.id, left, top, item.bgColor)
        return undefined
      },
    }),
    [handleDrop, updateDropAreaPos]
  )

  // console.log("boxes", dropAreas, pos)

  const isActive = isOver
  const bg = isActive ? "bg-green-100" : "bg-white"

  return (
    <div className={` relative h-screen w-screen `}>
      <div ref={drop} className={`absolute h-full w-full ${bg}`}>
        {" "}
      </div>
      {pos.isVisible && <DropArea pos={{ y: pos.y, x: pos.x - 300 }} />}
      {console.log("dropAreas", dropAreas)}
      {Object.keys(dropAreas)?.map((id, idx) => (
        <React.Fragment key={idx}>
          <DropArea {...dropAreas[id]} onDrop={(item) => handleDrop(item, id)} />
        </React.Fragment>
      ))}
    </div>
  )
}
