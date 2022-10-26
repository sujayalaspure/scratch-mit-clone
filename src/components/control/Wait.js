import React from "react"

function Wait({ seconds }) {
  return (
    <>
      Wait
      <span className="mx-2 bg-white text-black px-2 rounded-lg">{seconds}</span>
      seconds
    </>
  )
}

export default Wait
