import { blockType } from "../components/getBlockComp"

export default [
  {
    label: "Motion",
    bgColor: "bg-blue-500",
    blocks: [
      {
        type: blockType.MOVE,
        params: { steps: 10 },
      },
      {
        type: blockType.TURN,
        params: { degrees: 15, direction: "left" },
      },
      {
        type: blockType.TURN,
        params: { degrees: 15, direction: "right" },
      },
    ],
  },
  {
    label: "Events",
    bgColor: "bg-yellow-500",
    blocks: [
      {
        type: blockType.FLAG,
        params: {},
      },
      {
        type: blockType.SPRITE,
        params: {},
      },
      {
        type: blockType.BROADCAST,
        params: { message: "Hello" },
      },
    ],
  },
  {
    label: "Control",
    bgColor: "bg-green-500",
    blocks: [
      {
        type: blockType.WAIT,
        params: { seconds: 5 },
      },
      {
        type: blockType.REPEAT,
        params: { times: 10 },
      },
      {
        type: blockType.STOP,
      },
    ],
  },
  {
    label: "Looks",
    bgColor: "bg-indigo-500",
    blocks: [
      {
        type: blockType.SAY_MESSAGE,
        params: { message: "Hello" },
      },
      {
        type: blockType.SAY_MESSAGE,
        params: { message: "Hello", duration: 2 },
      },
      {
        type: blockType.THINK,
        params: { message: "Hello" },
      },
    ],
  },
]
