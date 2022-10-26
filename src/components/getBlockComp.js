import React from "react"
import Repeat from "./control/Repeat"
import Stop from "./control/Stop"
import Wait from "./control/Wait"
import DraggableBlock from "./DraggableBlock"
import Broadcast from "./events/Broadcast"
import FlagClick from "./events/FlagClick"
import SpriteClick from "./events/SpriteClick"
import SayMessage from "./looks/SayMessage"
import Think from "./looks/Think"
import Move from "./motion/Move"
import Turn from "./motion/Turn"

export const blockType = {
  MOVE: "MOVE",
  MOVE_Y: "MOVE_Y",
  TURN: "TURN",
  GOTO_XY: "GOTO_XY",
  SAY_MESSAGE: "SAY_MESSAGE",
  THINK: "THINK",
  BROADCAST: "BROADCAST",
  WAIT: "WAIT",
  REPEAT: "REPEAT",
  STOP: "STOP",
  FLAG: "FLAG",
  SPRITE: "SPRITE",
}

const getCompByType = (key, params) => {
  switch (key) {
    case blockType.MOVE:
      return <Move {...params} />
    case blockType.TURN:
      return <Turn {...params} />
    case blockType.SAY_MESSAGE:
      return <SayMessage {...params} />
    case blockType.THINK:
      return <Think {...params} />
    case blockType.BROADCAST:
      return <Broadcast {...params} />
    case blockType.FLAG:
      return <FlagClick {...params} />
    case blockType.SPRITE:
      return <SpriteClick {...params} />
    case blockType.WAIT:
      return <Wait {...params} />
    case blockType.REPEAT:
      return <Repeat {...params} />
    case blockType.STOP:
      return <Stop {...params} />

    default:
      break
  }
}

const getComponent = (type, params) => {
  return <DraggableBlock {...{ params, type }}>{getCompByType(type, params)}</DraggableBlock>
}

export default getComponent
