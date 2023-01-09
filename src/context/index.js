import React, { createContext, useContext, useEffect, useState } from "react"
import { blockType } from "../components/getBlockComp"

const Context = createContext()

export const useBlocks = () => useContext(Context)

const ContextProvider = ({ children }) => {
  const [runningBlocks, setRunningBlocks] = useState([])

  const [sprites, setSprites] = useState({
    "sprite-0": { id: "sprite-0", pos: { x: 0, y: 100 }, angle: 0 },
  })
  const [currentActiveSprite, setCurrentActiveSprite] = useState(sprites["sprite-0"])

  const [dropAreas, setDropAreas] = useState({
    0: { id: 0, blocks: [], pos: { x: 50, y: 70 } },
  })
  let lastId = 0
  let lastAction = null
  const [position, setPosition] = useState({
    x: 10,
    y: 60,
  })

  const addDropArea = (pos, item, it) => {
    const size = Object.keys(dropAreas).length
    setDropAreas((prev) => ({
      ...prev,
      [size + 1]: { id: size + 1, blocks: [{ ...item, id: lastId++ }], pos: { ...pos } },
    }))
  }

  const updateDropAreaPos = (id, pos) => {
    console.log("updateDropAreaPos", id, pos)
    setDropAreas((prev) => ({
      ...prev,
      [id]: { ...prev[id], pos: { ...pos } },
    }))
  }

  const handleAddBlocks = (block, id) => {
    setDropAreas((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        blocks:
          block.type === blockType.FLAG && prev[id].blocks.length !== 0
            ? prev[id].blocks[0].type === blockType.FLAG
              ? [...prev[id].blocks]
              : [{ ...block, id: lastId++ }, ...prev[id].blocks]
            : [...prev[id].blocks, { ...block, id: lastId++ }],
      },
    }))
  }

  // const addBlocks = (newBlock, pos) => {
  //   if (position.x === 0 && position.y === 0) {
  //     setPosition(pos)
  //     // console.log("update pos")
  //   }
  //   // console.log("helo", runningBlocks, position)
  //   if (newBlock.action.type === actionTypes.EVENT_CLICK && lastId !== 0) {
  //     if (lastAction) return
  //     setRunningBlocks((prev) => [{ ...newBlock, id: lastId }, ...prev])
  //     lastId++
  //     lastAction = true
  //     return
  //   }

  //   setRunningBlocks((prev) => [...prev, { ...newBlock, id: lastId }])
  //   lastId++
  // }

  useEffect(() => {
    console.log("runningBlocks")
  }, [lastId])

  const value = {
    runningBlocks,
    // addBlocks,
    position,
    dropAreas,
    handleAddBlocks,
    addDropArea,
    currentActiveSprite,
    sprites,
    setCurrentActiveSprite,
    setSprites,
    updateDropAreaPos,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withBlocks = (Child) => (props) =>
  (
    <Context.Consumer>
      {(context) => <Child {...props} {...context} />}
      {/* Another option is:  {context => <Child {...props} context={context}/>}*/}
    </Context.Consumer>
  )

export default ContextProvider
