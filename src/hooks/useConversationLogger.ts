import { ChatDecisionTreeNode } from "../DecisionTree/types";

export function useConversationLogger(chatSteps: ChatDecisionTreeNode[]) {
  return {
    logConversation: () => {
      const stepDetails = chatSteps.map((step) => {
        let log = "";
        if (step.type == "confirmComponent" && step.stepLogQuestion) {
          log += step.stepLogQuestion + " -> ";
        }
        if (step.stepResult) {
          log += step.shouldLocalizeData
            ? step.stepResult.localized
            : step.stepResult.value ?? "";
        }

        return log;
      });
      console.log(stepDetails.join("\n\n"));
    },
  };
}
