import React from "react"
import {useDrop} from "react-dnd"
import {ItemTypes} from "../ItemTypes"

function MiddleSection() {
  const [{isOver}, drop] = useDrop(() => ({
    accept: [ItemTypes.BOX, ItemTypes.DROP_AREA],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item, monitor) {
      console.log("drop", item, monitor)
    },
    hover(item, monitor) {
      console.log("hover", item, monitor)
    },
  }))

  const bg = isOver ? "bg-green-100" : "bg-white"

  return (
    <div className="relative h-screen w-screen">
      <div ref={drop} className={`absolute h-full w-full ${bg}`}>
        {" "}
      </div>
    </div>
  )
}

export default MiddleSection
