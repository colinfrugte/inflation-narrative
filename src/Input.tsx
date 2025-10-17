import { useState, ChangeEvent, FormEvent, JSX } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Graph from "./Graph";

type NodeScore = {
  id: string;
  score: number;
};

type EdgeScore = {
  source: string;
  target: string;
  score: number;
};

export default function TextInputToApi(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [nodes, setNodes] = useState<NodeScore[]>([]);
  const [edges, setEdges] = useState<EdgeScore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [edgeThreshold, setEdgeThreshold] = useState(0);
  const [nodeThreshold, setNodeThreshold] = useState(0);

  const [committedEdgeThreshold, setCommittedEdgeThreshold] =
    useState(edgeThreshold);
  const [committedNodeThreshold, setCommittedNodeThreshold] =
    useState(nodeThreshold);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleEdgeCommit = () => setCommittedEdgeThreshold(edgeThreshold);
  const handleNodeCommit = () => setCommittedNodeThreshold(nodeThreshold);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (err) {
      console.error(err);
      setNodes([]);
      setEdges([]);
    } finally {
      setIsLoading(false);
    }

    setText(""); // optional: Eingabe leeren
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress
          sx={(theme) => ({
            color: theme.palette.grey[600],
            ...theme.applyStyles("dark", {
              color: theme.palette.grey[100],
            }),
          })}
          size={40}
          thickness={4}
          value={100}
        />
      ) : nodes.length > 0 ? (
        <Graph
          nodes={nodes}
          edges={edges}
          edgeThreshold={committedEdgeThreshold}
          nodeThreshold={committedNodeThreshold}
        />
      ) : null}
      <div className="fixed bottom-0 left-0 right-0 ">
        <form
          className="max-w-md mx-auto"
          onSubmit={handleSubmit}
          style={{ padding: "1rem" }}
        >
          <div className=" flex flex-row space-x-4  px-4 ">
            <input
              type="range"
              className="accent-gray-800"
              min={0}
              max={1}
              step={0.00002}
              value={nodeThreshold}
              onChange={(event) => {
                setNodeThreshold(event.target.valueAsNumber);
              }}
              onPointerUp={handleNodeCommit} /* deckt Maus + Touch + Pen ab */
              onKeyUp={handleNodeCommit}
            />
            <p className="text-gray-500">
              Nodes Threshold: {nodeThreshold.toFixed(3)}
            </p>
          </div>
          <div className=" flex flex-row space-x-4 py-2 px-4 ">
            <input
              type="range"
              className="accent-gray-800"
              min={-15}
              max={15}
              step={0.02}
              value={edgeThreshold}
              onChange={(event) => {
                setEdgeThreshold(event.target.valueAsNumber);
              }}
              onPointerUp={handleEdgeCommit} /* deckt Maus + Touch + Pen ab */
              onKeyUp={handleEdgeCommit}
            />
            <p className="text-gray-500">
              Edges Threshold: {edgeThreshold.toFixed(3)}
            </p>
          </div>
          <div className="flex flex-row space-x-2 bg-white rounded-2xl border border-gray-100 shadow-md">
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="type here"
              className="basis-192 py-4 px-6 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className=" bg-gray-800 p-2 m-3 text-white  rounded-full hover:bg-gray-600 transition"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
