import { useEffect, useRef } from "react";
import {
  DataSet,
  Edge,
  Network,
  Node,
} from "vis-network/standalone/esm/vis-network";

interface NodeScore {
  id: string;
  score: number;
}

interface EdgeScore {
  source: string;
  target: string;
  score: number;
}

interface GraphProps {
  nodes: NodeScore[];
  edges: EdgeScore[];
  edgeThreshold: number;
  nodeThreshold: number;
}

export default function Graph({
  nodes,
  edges,
  edgeThreshold,
  nodeThreshold,
}: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  const nodesDS = useRef(new DataSet<Node>());
  const edgesDS = useRef(new DataSet<Edge>());

  /* ---------- 1) Initialisiere Netzwerk (nur einmal) ---------- */
  useEffect(() => {
    if (!containerRef.current || networkRef.current) return;

    networkRef.current = new Network(
      containerRef.current,
      { nodes: nodesDS.current, edges: edgesDS.current },
      { physics: { enabled: true } }
    );

    networkRef.current.once("stabilizationIterationsDone", () => {
      networkRef.current!.stopSimulation();
      networkRef.current!.setOptions({ physics: false });
    });
  }, []);

  /* ---------- 2) Aktualisiere Nodes & Edges bei Änderung ---------- */
  useEffect(() => {
    if (!networkRef.current) return;

    // 1. Filtere Nodes, die über dem nodeThreshold liegen
    const filteredNodes = nodes
      .filter((n) => n.score >= nodeThreshold)
      .map<Node>((n) => ({
        id: n.id,
        label: n.id,
        color: "#D3D3D3",
      }));

    // Mapping Label → ID (für die Edges)
    const allowedIds = new Set(filteredNodes.map((n) => n.id));

    // 2. Filtere Edges, bei denen beide Knoten sichtbar sind + score hoch genug
    const filteredEdges = edges
      .filter(
        (e) =>
          e.score >= edgeThreshold &&
          allowedIds.has(e.source) &&
          allowedIds.has(e.target)
      )
      .map<Edge>((e) => ({
        id: `${e.source}→${e.target}`,
        from: e.source,
        to: e.target,
        arrows: "to",
        color: "#D3D3D3",
      }));

    // 3. Update DataSets
    nodesDS.current.clear();
    edgesDS.current.clear();
    nodesDS.current.add(filteredNodes);
    edgesDS.current.add(filteredEdges);
  }, [nodes, edges, edgeThreshold, nodeThreshold]);

  return <div ref={containerRef} style={{ height: 600 }} />;
}
