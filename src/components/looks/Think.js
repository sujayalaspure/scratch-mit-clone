import React from "react"

function Think({ duration, message }) {
  return (
    <>
      Think
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

export default Think
