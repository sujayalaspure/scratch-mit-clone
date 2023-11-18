import React from "react"
import Sidebar from "./components/Sidebar"
import MidArea from "./components/MidArea"
import PreviewArea from "./components/PreviewArea"

import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import {withBlocks} from "./context"
import {BroadcastMessage} from "./components/events/Broadcast"
import RightArea from "./components/RightArea"

function App() {
  return (
    <>
      <div className="bg-blue-100 pt-6 font-sans relative">
        <div className="h-screen overflow-hidden flex flex-row  ">
          <DndProvider backend={HTML5Backend}>
            <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
              <Sidebar />
              <MidArea />
            </div>
            <RightArea />
          </DndProvider>
        </div>
        <BroadcastMessage />
      </div>
    </>
  )
}

export default withBlocks(App)
