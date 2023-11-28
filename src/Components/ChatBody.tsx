import { signal } from "@preact/signals-react";
import { useCallback, useEffect, useRef } from "react";
import { CurrentStepContext } from "../DecisionTree/CurrentStepContext";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import { useConversationLogger, useEventListener } from "../hooks";
import { useStepRenderer } from "../hooks/useStepRenderer";
import { textBarEnabled } from "../signals";

export const chatBodySize = signal<{ width: number; height: number }>({
  height: 0,
  width: 0,
});

export function ChatBody() {
  const { chatSteps, lastStep } = useDecisionTree();
  const { renderStep } = useStepRenderer();
  const containerRef = useRef<HTMLDivElement>(null);
  const setChatBodySize = useCallback(() => {
    if (containerRef.current) {
      chatBodySize.value = {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      };
      scrollToBottom();
    }
  }, []);
  const { logConversation } = useConversationLogger();

  useEventListener("resize", setChatBodySize);

  useEffect(setChatBodySize, [setChatBodySize, containerRef.current]);

  // Log conversation for last steps
  useEffect(() => {
    if (
      chatSteps[chatSteps.length - 1].children.length === 0 &&
      !chatSteps[chatSteps.length - 1].shouldWaitForUserInputAfterStep
    ) {
      logConversation(chatSteps);
    }
  }, [
    chatSteps,
    lastStep.children.length,
    logConversation,
    lastStep.shouldWaitForUserInputAfterStep,
  ]);

  useEffect(() => {
    scrollToBottom();

    // When waiting for user input, enable the textarea
    if (lastStep.shouldWaitForUserInputAfterStep) {
      textBarEnabled.value = true;
    }
  }, [chatSteps, lastStep.shouldWaitForUserInputAfterStep]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  let curStep = chatSteps[chatSteps.length - 1];

  while (
    curStep.sender === "bot" &&
    curStep.type === "text" &&
    curStep.children[0] &&
    !curStep.preventAutoRenderBotChild
  ) {
    curStep = curStep.children[0];
    chatSteps.push(curStep);
  }

  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto p-4 pe-6 bg-slate-100 dark:bg-[#00000036] gap-3"
      ref={containerRef}
    >
      {chatSteps.map((step, i) => (
        <CurrentStepContext.Provider key={i} value={step}>
          {renderStep(step, i)}
        </CurrentStepContext.Provider>
      ))}
    </div>
  );
}
