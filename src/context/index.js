import React, { createContext, useContext, useEffect, useState, useId } from "react"
import { actionTypes } from "./sidebarItems"

const Context = createContext()

export const useBlocks = () => useContext(Context)

const ContextProvider = ({ children }) => {
  const [runningBlocks, setRunningBlocks] = useState([])
  const [dropAreas, setDropAreas] = useState({
    1: { id: 1, blocks: [], pos: { x: 0, y: 0 } },
  })
  let lastId = 0
  let lastAction = null
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const addDropArea = (pos, item, it) => {
    const size = Object.keys(dropAreas).length
    setDropAreas((prev) => ({
      ...prev,
      [size + 1]: { id: size + 1, blocks: [{ ...item, id: lastId++ }], pos: { ...pos } },
    }))
  }

  const handleAddBlocks = (block, it) => {
    setDropAreas((prev) => ({
      ...prev,
      [it.id]: {
        ...prev[it.id],
        blocks:
          block.action.type === actionTypes.EVENT_CLICK && prev[it.id].blocks.length !== 0
            ? prev[it.id].blocks[0].action.type === actionTypes.EVENT_CLICK
              ? [...prev[it.id].blocks]
              : [{ ...block, id: lastId++ }, ...prev[it.id].blocks]
            : [...prev[it.id].blocks, { ...block, id: lastId++ }],
      },
    }))
  }

  const addBlocks = (newBlock, pos) => {
    if (position.x === 0 && position.y === 0) {
      setPosition(pos)
      console.log("update pos")
    }
    console.log("helo", runningBlocks, position)
    if (newBlock.action.type === actionTypes.EVENT_CLICK && lastId !== 0) {
      if (lastAction) return
      setRunningBlocks((prev) => [{ ...newBlock, id: lastId }, ...prev])
      lastId++
      lastAction = true
      return
    }

    setRunningBlocks((prev) => [...prev, { ...newBlock, id: lastId }])
    lastId++
  }

  useEffect(() => {
    console.log("runningBlocks")
  }, [lastId])
  const value = { runningBlocks, addBlocks, position, dropAreas, handleAddBlocks, addDropArea }

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
