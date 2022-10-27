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

export function MessageBox({ id }) {
  return (
    <>
      <div className="hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap" id={id + "-message-box"}></div>
      <div
        className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap"
        id={id + "-message-box1"}
      ></div>
    </>
  )
}

export default SayMessage
