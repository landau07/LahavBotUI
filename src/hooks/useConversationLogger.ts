import { ChatDecisionTreeNode } from "../DecisionTree/types";

export function useConversationLogger(chatSteps: ChatDecisionTreeNode[]) {
  return {
    logConversation: () => {
      const stepDetails = chatSteps.map((step) => step.stepValueToLog ?? "");
      console.log(stepDetails.join("\n\n"));
    },
  };
}
