import { useEffect, useRef } from "react";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import { useStepRenderer } from "../hooks/useStepRenderer";

export function ChatBody() {
  const { chatSteps } = useDecisionTree();
  const { renderStep } = useStepRenderer();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatSteps]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  let curStep = chatSteps[chatSteps.length - 1];

  while (
    curStep.sender === "bot" &&
    curStep.type === "text" &&
    curStep.children[0]
  ) {
    curStep = curStep.children[0];
    chatSteps.push(curStep);
  }

  return (
    <div
      className="flex flex-col flex-1 min-h-[200px] overflow-y-auto p-4 bg-slate-100 dark:bg-[#00000036] gap-3"
      ref={containerRef}
    >
      {chatSteps.map((step, i) => renderStep(step, i))}
    </div>
  );
}
