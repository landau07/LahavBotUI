import * as d3 from "d3";
import { useLayoutEffect, useRef } from "react";
import { isDesktop } from "react-device-detect";
import { chatBodySize } from "./ChatBody";

export const ForceDirectedGraph = () => {
  const data = generateData();

  const width = chatBodySize.value.width - 130;
  const height = chatBodySize.value.height - 64;
  const color = d3.scaleOrdinal(d3.schemeTableau10);
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = d3.select(canvasRef.current);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const context = canvas.node()!.getContext("2d");
    const nodes = data.map(Object.create);

    const simulation = d3
      .forceSimulation(nodes)
      .alphaTarget(0.3) // stay hot
      .velocityDecay(0.1) // low friction
      .force("x", d3.forceX().strength(0.01))
      .force("y", d3.forceY().strength(0.01))
      .force(
        "collide",
        d3
          .forceCollide()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .radius((d) => d.r + 1)
          .iterations(3)
      )
      .force(
        "charge",
        d3.forceManyBody().strength((_, i) => (i ? 0 : (-width * 2) / 3))
      )
      .on("tick", ticked);

    canvas
      .on("touchmove", (event) => event.preventDefault())
      .on("pointermove", pointermoved);

    // Handle cleanup
    return () => {
      simulation.stop();
    };

    function pointermoved(event: PointerEvent) {
      const [x, y] = d3.pointer(event);
      nodes[0].fx = x - width / 2;
      nodes[0].fy = y - height / 2;
    }

    function ticked() {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      for (let i = 1; i < nodes.length; ++i) {
        const d = nodes[i];
        context.beginPath();
        context.moveTo(d.x + d.r, d.y);
        context.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
        context.fillStyle = color(d.group);
        context.fill();
      }
      context.restore();
    }
  }, [data, width, height, color]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

const generateData = () => {
  const numNodes = isDesktop ? 300 : 200;
  const width = isDesktop ? 1200 : 600;
  const k = width / numNodes;
  const r = d3.randomUniform(k, k * 4);
  const n = 4;
  return Array.from({ length: numNodes }, (_, i) => ({
    r: r(),
    group: i && (i % n) + 1,
  }));
};
