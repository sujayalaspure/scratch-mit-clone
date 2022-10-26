import React from "react"

function Repeat({ times }) {
  return (
    <>
      Repeat
      <span className="mx-2 bg-white text-black px-2 rounded-lg">{times}</span>
      times
    </>
  )
}

export default Repeat
