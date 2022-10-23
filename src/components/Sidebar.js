import React from "react"
import sidebarItems, { blocks } from "../context/sidebarItems"
import DraggableBlock from "./DraggableBlock"

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {sidebarItems.map((item, index) => (
        <React.Fragment key={index}>
          <div className="font-bold"> {item.label} </div>
          {blocks
            .filter((block) => block.name === item.label)
            .map(({ id, component, action }) => (
              <DraggableBlock id={id} key={id} bgColor={item.bgColor} action={action}>
                {component}
              </DraggableBlock>
            ))}
        </React.Fragment>
      ))}
    </div>
  )
}
