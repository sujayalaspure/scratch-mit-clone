import React, { useCallback, useEffect, useState } from "react"
import { useDrop } from "react-dnd"
import update from "immutability-helper"

import { useBlocks } from "../context"
import Block from "./Block"
import DropArea from "./DropArea"
import { blocks } from "../context/sidebarItems"
import { ItemTypes } from "../ItemTypes"
import DraggableBlock from "./DraggableBlock"

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
    setBoxes(blocks.reduce((prev, item) => ({ ...prev, [item.id]: item }), {}))
  }, [])

  const handleDrop = useCallback(
    (item, it) => {
      console.log("onDrop", item, it)
      if (it === null) {
        console.log("null it ")
        addDropArea({ x: pos.x - 250, y: pos.y }, item, it)
      } else {
        handleAddBlocks(item, it)
      }
    },
    [pos]
  )

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        // let left = Math.round(delta.x)
        // let top = Math.round(delta.y)
        // console.log("delta drop")
        handleDrop(item, null)
        // moveBox(item.id, left, top, item.bgColor)
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
        console.log("delta", delta)
        // moveBox(item.id, left, top, item.bgColor)
        return undefined
      },
    }),
    [handleDrop]
  )

  console.log("boxes", dropAreas, pos)

  const isActive = isOver
  const bg = isActive ? "bg-green-100" : "bg-white"

  return (
    <div className={` relative h-screen w-screen `}>
      <div ref={drop} className={`absolute h-full w-full ${bg}`}>
        {" "}
      </div>

      {Object.keys(dropAreas)?.map((it) => (
        <DropArea {...dropAreas[it]} onDrop={(item) => handleDrop(item, dropAreas[it])} />
      ))}
    </div>
  )
}
