import React, { createContext, useContext, useState } from "react"

const Context = createContext()

export const useBlocks = () => useContext(Context)

const ContextProvider = ({ children }) => {
  const [runningBlocks, setRunningBlocks] = useState([])
  let lastId = 0
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const addBlocks = (newBlock, pos) => {
    if (position.x === 0 && position.y === 0) {
      setPosition(pos)
    }
    setRunningBlocks((prev) => {
      return [...prev, { ...newBlock, id: lastId }]
    })
    lastId++
  }

  const dummy = 1
  return <Context.Provider value={{ dummy, runningBlocks, addBlocks, position }}>{children}</Context.Provider>
}

export default ContextProvider
