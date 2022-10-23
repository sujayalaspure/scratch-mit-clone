import React, { useCallback } from "react"
import { useDrop } from "react-dnd"
import { useBlocks } from "../context"
import Block from "./Block"

export default function MidArea() {
  const { runningBlocks, addBlocks } = useBlocks()

  const addCurrentBlock = useCallback((item, delta) => {
    addBlocks(item, delta)
  }, [])

  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item, monitor) {
        const delta = monitor.getClientOffset()
        // const left = Math.round(item.left + delta.x)
        // const top = Math.round(item.top + delta.y)
        // console.log({ item, delta })
        addCurrentBlock(item, delta)
        return undefined
      },
    }),
    []
  )

  console.log(runningBlocks)

  return (
    <div className="flex-1 h-full overflow-auto" ref={drop}>
      <div className="w-full flex flex-col col-auto items-center">
        <h1>Hello</h1>
        {runningBlocks?.map((item, index) => (
          <Block key={item.id} bgColor={item.bgColor}>
            {item.children}
          </Block>
        ))}
      </div>
    </div>
  )
}
