import { ChatDecisionTreeNode } from "../DecisionTree/types";

export function useConversationLogger() {
  return {
    logConversation: (chatSteps: ChatDecisionTreeNode[]) => {
      const stepDetails = chatSteps.map((step) => {
        let log = "";
        if (step.type == "confirmComponent" && step.stepLogQuestion) {
          log += step.stepLogQuestion + " -> ";
        }
        if (step.result) {
          log += step.shouldLocalizeData
            ? step.result.localized
            : step.result.value ?? "";
        }

        return log;
      });
      console.log(stepDetails.join("\n\n"));
    },
  };
}
