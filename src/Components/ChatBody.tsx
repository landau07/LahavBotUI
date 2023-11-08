import { useEffect, useRef } from "react";
import { chatSteps } from "../signals";
import { renderStep } from "../utils/StepRendererUtil";

export function ChatBody() {
  const steps = chatSteps.value;
  let curStep = steps[steps.length - 1];

  while (
    curStep.sender === "bot" &&
    curStep.type === "text" &&
    curStep.children[0]
  ) {
    curStep = curStep.children[0];
    steps.push(curStep);
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the bottom of the container
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [steps]); // Scroll when steps change

  return (
    <div
      className="flex flex-col flex-1 min-h-[200px] overflow-y-auto p-4 bg-slate-100 dark:bg-[#00000036] gap-3"
      ref={containerRef}
    >
      {steps.map((step, index) => renderStep(step, index))}
    </div>
  );
}
