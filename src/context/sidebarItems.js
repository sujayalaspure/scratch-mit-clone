import React from "react"
import Icon from "../components/Icon"

export default [
  {
    label: "Motion",
    bgColor: "bg-blue-500",
  },
  {
    label: "Events",
    bgColor: "bg-yellow-500",
  },
  {
    label: "Control",
    bgColor: "bg-green-500",
  },
  {
    label: "Looks",
    bgColor: "bg-indigo-500",
  },
]

export const actionTypes = {
  MOVE_BOX: "MOVE_BOX",
  SAY: "SAY",
  MOVE: "MOVE",
  TURN: "TURN",
  TURN_LEFT: "TURN_LEFT",
  TURN_RIGHT: "TURN_RIGHT",
  WAIT: "WAIT",
  REPEAT: "REPEAT",
  END: "END",
  IF: "IF",
  EVENT_CLICK: "EVENT_CLICK",
}

export const blocks = [
  {
    id: "1",
    action: {
      type: actionTypes.SAY,
      payload: {
        text: "Hello!",
        time: 2000,
      },
    },
    name: "Looks",
    component: <>{"Say Hello! for 2 seconds"}</>,
  },
  {
    id: "2",
    action: {
      type: actionTypes.SAY,
      payload: {
        text: "Hello!",
      },
    },
    name: "Looks",
    component: <>{"Say Hello!"}</>,
  },
  {
    id: "3",

    action: {
      type: actionTypes.SAY,
      payload: {
        text: "Hmm...",
        time: 2000,
      },
    },
    name: "Looks",
    component: <>{"think Hmm... from 2 seconds"}</>,
  },
  {
    id: "4",
    action: {
      type: "",
      payload: null,
    },
    name: "Looks",
    component: <>{"Next Costume"}</>,
  },
  {
    id: "5",
    action: {
      type: actionTypes.WAIT,
      payload: {
        time: 1000,
      },
    },
    name: "Control",
    component: <>{"Wait 1 seconds"}</>,
  },
  {
    id: "6",
    action: {
      type: actionTypes.REPEAT,
      payload: {
        times: 10,
      },
    },
    name: "Control",
    component: <>{"Repeat 10 "}</>,
  },
  {
    id: "7",
    action: {
      type: actionTypes.WAIT,
      payload: null,
    },
    name: "Control",
    component: <>{"Wait until"}</>,
  },
  {
    id: "8",
    action: {
      type: actionTypes.END,
      payload: null,
    },
    name: "Control",
    component: <>{"Stop all"}</>,
  },
  {
    id: "9",
    action: {
      type: actionTypes.EVENT_CLICK,
      payload: {
        what: "flag",
        condition: "clicked",
      },
    },
    name: "Events",
    component: (
      <>
        {"When "} <Icon name="flag" size={15} className="text-green-600 mx-2" /> {"clicked"}
      </>
    ),
  },
  {
    id: "10",
    action: {
      type: actionTypes.EVENT_CLICK,
      payload: {
        what: "sprite",
        condition: "clicked",
      },
    },
    name: "Events",
    component: <>{"When this sprite clicked"}</>,
  },
  {
    id: "11",
    action: {
      type: actionTypes.MOVE,
      payload: {
        steps: 10,
      },
    },
    name: "Motion",
    component: <>{"Move 10 steps"}</>,
  },
  {
    id: "12",
    action: {
      type: actionTypes.TURN_LEFT,
      payload: {
        degrees: 15,
      },
    },
    name: "Motion",
    component: (
      <>
        {"Turn "} <Icon name="undo" size={15} className="text-white mx-2" /> {"15 degrees"}
      </>
    ),
  },
  {
    id: "13",
    action: {
      type: actionTypes.TURN_RIGHT,
      payload: {
        degrees: 15,
      },
    },
    name: "Motion",
    component: (
      <>
        {"Turn "} <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </>
    ),
  },
]
