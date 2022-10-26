import React from "react"

function Block(props) {
  // console.log("block", props)
  return (
    <div
      className={`flex flex-row flex-wrap ${props.bgColor} text-white px-2 py-1 my-2 text-sm cursor-pointer w-max  border-2`}
    >
      {props.children}
    </div>
  )
}

export default Block
