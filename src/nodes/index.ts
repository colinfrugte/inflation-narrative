import type { NodeTypes } from "@xyflow/react";

import { TextUpdaterNode } from "./MyNode";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode } from "./types";

export const initialNodes: AppNode[] = [
  // { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
  // {
  //   id: "b",
  //   type: "position-logger",
  //   position: { x: -100, y: 100 },
  //   data: { label: "drag me!" },
  // },
  // { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  // {
  //   id: "d",
  //   type: "output",
  //   position: { x: 0, y: 200 },
  //   data: { label: "with React Flow" },
  // },
  {
    id: "e",
    type: "text-updater",
    data: { label: "Text Updater" },
    position: { x: 0, y: 250 },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "text-updater": TextUpdaterNode,
} satisfies NodeTypes;
