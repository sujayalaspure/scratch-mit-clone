import React from "react"

function Block({ children, bgColor }) {
  return (
    <div className={`flex flex-row flex-wrap ${bgColor} text-white px-2 py-1 my-2 text-sm cursor-pointer w-max `}>
      {children}
    </div>
  )
}

export default Block
