import { ReactNode, createContext, useState } from "react";
import "react-day-picker/dist/style.css";
import { useConversationLogger } from "../hooks/useConversationLogger";
import { takeUntil } from "../utils/arrayUtils";
import { ChatDecisionTreeNode, DecisionTreeContextType } from "./types";

export const DecisionTreeContext =
  createContext<DecisionTreeContextType | null>(null);

export function DecisionTreeProvider({ children }: { children: ReactNode }) {
  const welcomeStep: ChatDecisionTreeNode = {
    id: 0,
    branchKey: 0,
    parent: null,
    children: [],
    sender: "bot",
    type: "text",
    content: "welcomeMessage",
  };
  const [chatSteps, setChatSteps] = useState<ChatDecisionTreeNode[]>([
    welcomeStep,
  ]);
  const { logConversation } = useConversationLogger(chatSteps);

  const userTypeStep: ChatDecisionTreeNode = {
    id: 1,
    branchKey: 0,
    parent: welcomeStep,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["parent", "highRiskPregnancy", "teamMember", "donator", "other"],
  };

  const isBabyStillInHospitalStep: ChatDecisionTreeNode = {
    id: 2,
    branchKey: 0,
    parent: userTypeStep,
    children: [],
    sender: "bot",
    type: "text",
    content: "isStillInNICU",
  };

  const isBabyStillInHospitalAnswerStep: ChatDecisionTreeNode = {
    id: 3,
    branchKey: 0,
    parent: isBabyStillInHospitalStep,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["yes", "no"],
  };

  const whichHospitalStep: ChatDecisionTreeNode = {
    id: 4,
    branchKey: 0,
    parent: isBabyStillInHospitalAnswerStep,
    children: [],
    sender: "bot",
    type: "dropdown",
    text: "whichHospital",
    options: [
      "telHashomer",
      "schneider",
      "rambam",
      "sheareiTzedek",
      "soroka",
      "wolfson",
      "hadassah",
      "maayaneiHayeshua",
    ],
  };

  const birthDateStep: ChatDecisionTreeNode = {
    id: 5,
    branchKey: 0,
    parent: whichHospitalStep,
    children: [],
    sender: "bot",
    type: "text",
    content: "whatWasTheBirthDate",
  };

  const birthDateAnswerStep: ChatDecisionTreeNode = {
    id: 6,
    branchKey: 0,
    parent: birthDateStep,
    children: [],
    sender: "user",
    type: "date",
  };

  const notImplementedYetStepTemplate: ChatDecisionTreeNode = {
    id: -1,
    branchKey: 0,
    parent: userTypeStep,
    children: [],
    sender: "bot",
    type: "text",
    content: "pathNotReadyYet",
    divProps: {
      onClick: logConversation,
      className:
        "transform hover:scale-105 transition-transform duration-50 cursor-pointer",
    },
  };

  welcomeStep.children = [userTypeStep];
  userTypeStep.children = [isBabyStillInHospitalStep, null, null, null, null];
  isBabyStillInHospitalStep.children = [isBabyStillInHospitalAnswerStep];
  isBabyStillInHospitalAnswerStep.children = [whichHospitalStep, null];
  whichHospitalStep.children = [birthDateStep];

  birthDateStep.children = [birthDateAnswerStep];

  const setNextStep = (step: ChatDecisionTreeNode, childIndex: number = 0) => {
    const nextStep = step.children[childIndex]
      ? { ...step.children[childIndex], branchKey: new Date().getTime() } // Updating the branchKey of the child so it will be rerender in case of going back in flow
      : {
          ...notImplementedYetStepTemplate,
        };

    setChatSteps((prev) =>
      takeUntil(prev, (s) => s === step).concat(
        nextStep as ChatDecisionTreeNode
      )
    );
  };

  const contextValue: DecisionTreeContextType = {
    chatSteps,
    setNextStep,
  };

  return (
    <DecisionTreeContext.Provider value={contextValue}>
      {children}
    </DecisionTreeContext.Provider>
  );
}
