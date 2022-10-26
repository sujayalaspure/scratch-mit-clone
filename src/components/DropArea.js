import React, { useEffect } from "react"
import { useDrag, useDrop } from "react-dnd"
import Block from "./Block"
import { ItemTypes } from "../ItemTypes"
import { getEmptyImage } from "react-dnd-html5-backend"

function DropArea({ onDrop, blocks, pos }) {
  const { x, y } = pos
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

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { x, y },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [x, y]
  )
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const isActive = isOver
  let backgroundColor = "#0000"
  const bg = isActive ? "bg-green-100" : "bg-white"
  if (isActive) {
    backgroundColor = "darkgreen"
  } else if (canDrop) {
    backgroundColor = "darkkhaki"
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor,
        minHeight: 100,
        minWidth: 100,
        width: "max-content",
        border: "1px dotted black",
        position: "absolute",
        top: pos.y + "px",
        left: pos.x + "px",
        // transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      {/* <h1>Hello</h1> */}
      {blocks?.map((item, index) => (
        <Block key={item.id} bgColor={item.bgColor}>
          {item.children}
        </Block>
      ))}
    </div>
  )
}

export default DropArea
