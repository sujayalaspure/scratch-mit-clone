import React from "react"
import runEvent from "../../Events"
import { blockType } from "../getBlockComp"

function Broadcast({ message }) {
  const onPress = (e) => {
    runEvent(null, blockType.BROADCAST, { message })
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        Broadcast
        <span className="ml-2 bg-white text-black px-2 rounded-lg">{message}</span>
      </div>
      <button onClick={onPress} className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 rounded">
        Play
      </button>
    </div>
  )
}

export function BroadcastMessage({ message, id }) {
  return (
    <div
      id="broadcast-messsage"
      class="hidden absolute bottom-6 right-6 bg-white rounded-lg border-gray-300 border p-3 shadow-lg"
    >
      <div class="flex flex-row">
        <div class="px-2">
          <svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
            <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
          </svg>
        </div>
        <div class="ml-2 mr-6">
          <span id="broadcast-messsage-text" class="">
            {message}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Broadcast
