import React from "react"
import { blockType } from "./components/getBlockComp"
import { moveDir } from "./components/motion/Move"

const move = (id, params) => {
  const { direction, steps } = params
  const el = document.getElementById(id)
  var left = el.offsetLeft
  var top = el.offsetTop
  el.style.position = "relative"
  if (direction === moveDir.X) el.style.left = left + steps + "px"
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

const sayMessage = (id, params) => {
  const el = document.getElementById(`${id}-message-box`)
  const el2 = document.getElementById(`${id}-message-box1`)
  el.style.display = "block"
  el.style.position = "relative"
  el2.style.display = "none"
  el.innerHTML = params.message
  if (params.duration) {
    setTimeout(() => {
      el.style.display = "none"
    }, params.duration * 1000)
  }
}

const think = (id, params) => {
  const el = document.getElementById(`${id}-message-box`)
  const el2 = document.getElementById(`${id}-message-box1`)
  el.style.display = "block"
  el.style.position = "relative"
  el2.style.display = "block"
  el2.style.position = "relative"

  el.innerHTML = params.message
  if (params.duration) {
    setTimeout(() => {
      el.style.display = "none"
      el2.style.display = "none"
    }, params.duration * 1000)
  }
}
const broadcast = (params) => {
  const el = document.getElementById(`broadcast-messsage`)
  const txt = document.getElementById(`broadcast-messsage-text`)
  el.classList.remove("hidden")

  txt.innerText = params.message
  const duration = 5
  if (duration) {
    setTimeout(() => {
      el.classList.add("hidden")
    }, duration * 1000)
  }
}

const runEvent = (currentSprite, type, params) => {
  console.log("run event", type)
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
    case blockType.SAY_MESSAGE:
      sayMessage(currentSprite.id, params)
      break
    case blockType.THINK:
      think(currentSprite.id, params)
      break
    case blockType.BROADCAST:
      broadcast(params)
      break

    default:
      break
  }
}

export default runEvent

export { move, rotate }
