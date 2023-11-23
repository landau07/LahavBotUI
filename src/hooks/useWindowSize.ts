import { useState } from "react";
import { useEventListener } from ".";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return windowSize;
}
