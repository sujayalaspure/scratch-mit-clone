import React from "react"
import {useDrag, useDrop} from "react-dnd"
import {useBlocks} from "../context"
import runEvent from "../Events"
import {ItemTypes} from "../ItemTypes"
import getComponent, {blockType} from "./getBlockComp"

function DropArea({onDrop, blocks, pos, id}) {
  const {currentActiveSprite, setCurrentActiveSprite} = useBlocks()
  // console.log("DropArea", blocks, pos, id)

  const [{isOver, canDrop}, drop] = useDrop(
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

  const [{isDragging}, drag] = useDrag(
    () => ({
      type: ItemTypes.DROP_AREA,
      item: {pos, id},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  )

  const isActive = isOver
  const bg = isActive ? "bg-green-100" : canDrop ? "bg-red-100" : "bg-white"

  return (
    <div>
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
          {blocks?.map(({type, params}, index) => (
            <React.Fragment key={index}> {getComponent(type, {...params})}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DropArea
