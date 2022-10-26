import React from "react"

function SayMessage({ duration, message }) {
  return (
    <>
      Say
      <span className="mx-2 bg-white text-black px-2 rounded-lg">{message}</span>
      {duration && (
        <>
          for
          <span className="mx-2 bg-white text-black px-2 rounded-lg">{duration}</span> seconds
        </>
      )}
    </>
  )
}

export default SayMessage
