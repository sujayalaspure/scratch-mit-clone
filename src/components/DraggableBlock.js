import React from "react"
import {useDrag} from "react-dnd"

function DraggableBlock(props) {
  const {params, type, isDragEnabled} = props
  const [{isDragging}, drag] = useDrag(
    () => ({
      type: "box",
      item: {params, type},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: isDragEnabled,
    }),
    []
  )

  return (
    <div
      ref={drag}
      style={{
        cursor: !isDragging ? "grab" : "grabbing",
      }}
      className={`${isDragging && "border-2 opacity-70"} ${
        params.bgColor
      } text-white p-2 my-1 w-max text-center text-sm focus:cursor-move rounded-sm flex flex-row items-center`}
    >
      {props.children}
    </div>
  )
}

export default DraggableBlock
