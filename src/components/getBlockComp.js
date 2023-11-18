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

const getCompByType = (key, params, isSidebar) => {
  switch (key) {
    case blockType.MOVE:
      return <Move {...params} isSidebar={isSidebar} />
    case blockType.TURN:
      return <Turn {...params} isSidebar={isSidebar} />
    case blockType.SAY_MESSAGE:
      return <SayMessage {...params} isSidebar={isSidebar} />
    case blockType.THINK:
      return <Think {...params} isSidebar={isSidebar} />
    case blockType.BROADCAST:
      return <Broadcast {...params} isSidebar={isSidebar} />
    case blockType.FLAG:
      return <FlagClick {...params} isSidebar={isSidebar} />
    case blockType.SPRITE:
      return <SpriteClick {...params} isSidebar={isSidebar} />
    case blockType.WAIT:
      return <Wait {...params} isSidebar={isSidebar} />
    case blockType.REPEAT:
      return <Repeat {...params} isSidebar={isSidebar} />
    case blockType.STOP:
      return <Stop {...params} isSidebar={isSidebar} />

    default:
      break
  }
}

const getComponent = (type, params, isSidebar = false) => {
  return (
    <DraggableBlock isDragEnabled={isSidebar} {...{params, type}}>
      {getCompByType(type, params, isSidebar)}
    </DraggableBlock>
  )
}

export default getComponent
