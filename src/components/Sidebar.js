import React, { useCallback } from "react"
import sidebarItems, { blocks } from "../context/sidebarItems"
import DraggableBlock from "./DraggableBlock"
import { useDrop } from "react-dnd"

export default function Sidebar() {
  const moveBox = useCallback((id, left, top) => {
    console.log({ id, left, top })
  }, [])
  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        console.log({ item })
        // moveBox(item.id, left, top)
        return undefined
      },
    }),
    []
  )
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {sidebarItems.map((item, index) => (
        <React.Fragment key={index}>
          <div className="font-bold"> {item.label} </div>
          <div ref={drop}>
            {blocks
              .filter((block) => block.name === item.label)
              .map(({ id, component, action }, index) => (
                <DraggableBlock id={id} key={id} bgColor={item.bgColor} action={action}>
                  {component}
                </DraggableBlock>
              ))}
          </div>
        </React.Fragment>
      ))}
      {/* <DraggableBlock bgColor={"bg-yellow-500"}>
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </DraggableBlock>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Move 10 steps"}
      </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div> */}
    </div>
  )
}
