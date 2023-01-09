import React from "react"
import { useBlocks } from "../context"
import CatSprite from "./CatSprite"
import Icon from "./Icon"
import { blockType } from "./getBlockComp"
import runEvent from "../Events"
import { MessageBox } from "./looks/SayMessage"
import PreviewArea from "./PreviewArea"

export default function RightArea() {
  const { sprites, setSprites, dropAreas, currentActiveSprite, setCurrentActiveSprite } = useBlocks()

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
      <PreviewArea {...{ sprites, currentActiveSprite, setCurrentActiveSprite }} />
    </div>
  )
}
