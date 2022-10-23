import React, { createContext, useContext, useEffect, useState } from "react"
import { actionTypes } from "./sidebarItems"

const Context = createContext()

export const useBlocks = () => useContext(Context)

const ContextProvider = ({ children }) => {
  const [runningBlocks, setRunningBlocks] = useState([])
  let lastId = 0
  let lastAction = null
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const addBlocks = (newBlock, pos) => {
    // if (position.x === 0 && position.y === 0) {
    setPosition(pos)
    // }
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
  const value = { runningBlocks, addBlocks, position }

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
