import React, { useState } from "react"
import { useDrop } from "react-dnd"
import { ItemTypes } from "../ItemTypes"
import CatSprite from "./CatSprite"
import DropArea from "./DropArea"
import { MessageBox } from "./looks/SayMessage"

export default function PreviewArea({ sprites, currentActiveSprite, setCurrentActiveSprite }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const onSpriteClick = (e, id) => {
    e.stopPropagation()
    setCurrentActiveSprite(sprites[id])
  }

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.SPRITE,

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        let left = Math.round(sprites[item.id].pos.x + delta.x)
        let top = Math.round(sprites[item.id].pos.y + delta.y)
        setPosition({ x: left, y: top })
        console.log("delta", item, { x: left, y: top }, isOver, canDrop)
        sprites[item.id].pos.x = left
        sprites[item.id].pos.y = top
        // moveBox(item.id, left, top, item.bgColor)
        return undefined
      },
    }),
    []
  )

  return (
    <div
      ref={drop}
      className="relative overflow-hidden h-full bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2"
    >
      {/* <DropArea pos={{ y: sprites[item.id].pos.y, x: sprites[item.id].pos.x }} /> */}
      <div className="flex justify-around h-full">
        {Object.keys(sprites).map((key, index) => (
          <div
            className={`absolute ${key === currentActiveSprite.id ? "border-b-2" : ""} `}
            key={sprites[key].id}
            onClick={(e) => onSpriteClick(e, sprites[key].id)}
            style={{
              position: "relative",
              top: sprites[key].pos.y,
              left: sprites[key].pos.x,
            }}
          >
            <MessageBox id={sprites[key].id} />
            <CatSprite me={sprites[key]} id={sprites[key].id} />
          </div>
        ))}
      </div>
    </div>
  )
}
