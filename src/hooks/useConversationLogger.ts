import * as amplitude from "@amplitude/analytics-browser";
import { useIntl } from "react-intl";
import { howCanWeHelpYouQuestion } from "../DecisionTree/StepsDefinitions";
import { ChatDecisionTreeNode } from "../DecisionTree/types";
import { useMondayClient } from "./useMondayClient";

export function useConversationLogger() {
  const logToMonday = useMondayClient();
  const intl = useIntl();

  return {
    logConversation: (chatSteps: ChatDecisionTreeNode[]) => {
      const stepDetails = chatSteps.map((step) => {
        let log = "";
        if (step.type == "confirmComponent" && step.stepLogQuestion) {
          log += intl.formatMessage({ id: step.stepLogQuestion }) + " -> ";
        }
        if (step.result) {
          log += step.shouldLocalizeData
            ? step.result.localized
            : step.result.value ?? "";
        }
        return log || step.id;
      });

      const jointString = stepDetails.join("\n\n");
      const hasUserMessage = !!chatSteps.find(
        (step) => step.id === howCanWeHelpYouQuestion.id
      );

      const userMessages = chatSteps
        .filter((step) => step.id === "userMessage")
        .map((step) => step.result?.value)
        .join(" - ");

      console.log(jointString, hasUserMessage);
      logToMonday({
        stepResults: jointString,
        hasUserMessage,
        userMessages,
      });
      amplitude.track("steps", { steps: jointString, hasUserMessage });
    },
  };
}
