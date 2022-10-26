import React from "react"
import { blockType } from "./components/getBlockComp"
import { moveDir } from "./components/motion/Move"
import { useBlocks } from "./context"

const move = (id, params) => {
  const { direction, steps } = params
  const el = document.getElementById(id)
  var left = el.offsetLeft
  var top = el.offsetTop
  el.style.position = "relative"
  el.style.left = left + steps + "px"
  if (direction === moveDir.Y) el.style.top = top + steps + "px"
}

const rotate = (id, currentAngle, params) => {
  const { degrees, direction } = params
  const ang = direction === "left" ? -1 * degrees : degrees
  const el = document.getElementById(id)
  el.style.transform = `rotate(${currentAngle + ang}deg)`
}

const wait = (ms) => {
  let last_time = new Date().getTime()
  let curr_time = new Date().getTime()
  while ((curr_time - last_time) / 1000 < ms) {
    curr_time = new Date().getTime()
  }
}

const runEvent = (currentSprite, type, params) => {
  switch (type) {
    case blockType.MOVE:
      move(currentSprite.id, params)
      break
    case blockType.TURN:
      rotate(currentSprite.id, currentSprite.angle, params)
      break
    case blockType.WAIT:
      wait(params.seconds)
      break

    default:
      break
  }
  return <></>
}

export default runEvent

export { move, rotate }
