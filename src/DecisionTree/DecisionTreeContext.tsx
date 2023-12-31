import { ReactNode, createContext, useState } from "react";
import "react-day-picker/dist/style.css";
import { textBarEnabled } from "../signals";
import { takeUntil } from "../utils/arrayUtils";
import { notImplementedYetStepTemplate, welcomeStep } from "./StepsDefinitions";
import {
  ChatDecisionTreeNode,
  DecisionTreeContextType,
  SetNextStepOptions,
} from "./types";

export const DecisionTreeContext =
  createContext<DecisionTreeContextType | null>(null);

export function DecisionTreeProvider({ children }: { children: ReactNode }) {
  const [chatSteps, setChatSteps] = useState<ChatDecisionTreeNode[]>([
    welcomeStep,
  ]);

  const setNextStep = (
    step: ChatDecisionTreeNode,
    { childIndex = 0 }: SetNextStepOptions = {}
  ) => {
    let nextStep: ChatDecisionTreeNode | null = step.children[childIndex];
    if (nextStep) {
      Object.assign<ChatDecisionTreeNode, Partial<ChatDecisionTreeNode>>(
        nextStep,
        {
          // Updating the branchKey of the child so it will be rerender in case of going back in flow
          branchKey: new Date().getTime(),
        }
      );
    } else {
      nextStep = notImplementedYetStepTemplate;
    }
    textBarEnabled.value = false; // reset the textBar when going back in time.
    setChatSteps((prev) =>
      takeUntil(prev, (s) => s === step).concat(nextStep!)
    );
  };

  const pushNewSteps = (...newSteps: ChatDecisionTreeNode[]) => {
    setChatSteps((prev) => prev.concat(...newSteps));
  };

  const getStepResult = (stepId: string) => {
    const step = chatSteps.find((s) => s.id === stepId);
    return step?.result;
  };

  const contextValue: DecisionTreeContextType = {
    chatSteps,
    setNextStep,
    getStepResult,
    pushNewStep: pushNewSteps,
    lastStep: chatSteps[chatSteps.length - 1],
  };

  return (
    <DecisionTreeContext.Provider value={contextValue}>
      {children}
    </DecisionTreeContext.Provider>
  );
}
