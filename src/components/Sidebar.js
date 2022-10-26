import React from "react"
import sidebarItems from "../context/sidebarItems"
import getComponent from "./getBlockComp"

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {sidebarItems.map((item, index) => (
        <React.Fragment key={index}>
          <div className="font-bold"> {item.label} </div>
          {item?.blocks.map(({ type, params }, index) => (
            <React.Fragment key={index}> {getComponent(type, { ...params, bgColor: item.bgColor })}</React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
