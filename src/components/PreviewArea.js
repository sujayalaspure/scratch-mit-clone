import React from "react"
import { useBlocks } from "../context"
import CatSprite from "./CatSprite"
import Icon from "./Icon"
import { blockType } from "./getBlockComp"
import runEvent from "../Events"
import { MessageBox } from "./looks/SayMessage"

export default function PreviewArea() {
  const { sprites, setSprites, dropAreas, currentActiveSprite, setCurrentActiveSprite } = useBlocks()

  // console.log("preview", sprites, currentActiveSprite)

  const handlePlay = (blocks) => {
    console.log("play", blocks)

    // e.stopPropagation()
    if (blocks.length === 0) return
    let i = 1
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
      if (type === blockType.STOP) {
        clearInterval(interval)
        return
      }
      if (type === blockType.REPEAT) {
        console.log("repeat-->", params)
        let rep = params?.times
        const { type: prevType, params: prev } = blocks[i - 1]
        console.log("repeat", rep, prev, type)
        for (let i = 0; i < rep; i++) {
          setTimeout(() => {
            runEvent(currentActiveSprite, prevType, prev)
          }, 1000 * i)
        }
      } else runEvent(currentActiveSprite, type, params)

      i++
      if (i >= blocks.length) clearInterval(interval)
    }, 1000)
  }

  const onClick = (e) => {
    e.stopPropagation()
    console.log("click")
    Object.keys(dropAreas).forEach((key) => {
      if (dropAreas[key]?.blocks[0]?.type === blockType.FLAG) {
        handlePlay(dropAreas[key].blocks)
      }
    })
  }

  const onSpriteClick = (e, id) => {
    e.stopPropagation()
    console.log("sprite click", id, sprites[id])
    setCurrentActiveSprite(sprites[id])

    // console.log("click")
    // Object.keys(dropAreas).forEach((key) => {
    //   if (dropAreas[key]?.blocks[0]?.type === blockType.SPRITE) {
    //     handlePlay(dropAreas[key].blocks)
    //   }
    // })
  }

  const createNewSprite = (e) => {
    e.stopPropagation()
    console.log("create new sprite")
    setSprites((prev) => ({
      ...prev,
      ["sprite-" + Object.keys(prev).length]: {
        pos: { x: 20, y: 20 },
        angle: 0,
        id: "sprite-" + Object.keys(prev).length,
      },
    }))
  }

  return (
    <div className="w-1/3 h-screen ">
      <div className="m-2 flex justify-between items-center">
        <div onClick={onClick}>
          <Icon name="flag" size={25} className="text-green-600 mx-2 cursor-pointer" />
        </div>
        <div>
          <h3>Current Sprite: {currentActiveSprite.id}</h3>
        </div>
        <button
          onClick={createNewSprite}
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >
          Create
        </button>
      </div>
      <div className="overflow-hidden h-full bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
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
              <CatSprite id={sprites[key].id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
