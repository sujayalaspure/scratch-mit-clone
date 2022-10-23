import React, { useEffect } from "react"
import { useBlocks } from "../context"
import CatSprite from "./CatSprite"
import Icon from "./Icon"

export default function PreviewArea() {
  const { runningBlocks } = useBlocks()

  const onClick = (e) => {
    e.stopPropagation()
    console.log("click")
  }

  return (
    <div className="w-1/3 h-screen ">
      <div className="my-2">
        <div onClick={onClick}>
          <Icon name="flag" size={25} className="text-green-600 mx-2 cursor-pointer" />
        </div>
      </div>
      <div className="overflow-hidden h-full flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
        <div className="flex-none h-full overflow-y-auto p-2  ">
          <div
            className={`duration-1000 ease-in-out transform transition-all translate-x-9`}
            style={{
              // transition: "all 1s ease-out",
              transform: "rotate(90deg)",
            }}
          >
            <CatSprite />
          </div>
        </div>
      </div>
    </div>
  )
}
