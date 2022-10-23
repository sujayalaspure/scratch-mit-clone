import React from "react"
import { useDrag } from "react-dnd"
import Block from "./Block"

function DraggableBlock({ id, children, bgColor, action }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { id, children, bgColor, action },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  )

  return (
    <div ref={drag} className={`${isDragging && "border-black border-2"}`}>
      <Block bgColor={bgColor}>{children}</Block>
    </div>
  )
}

export default DraggableBlock
