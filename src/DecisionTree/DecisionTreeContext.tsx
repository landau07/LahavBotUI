import { ReactNode, createContext, useState } from "react";
import "react-day-picker/dist/style.css";
import { BirthWeekAndDaySelector } from "../Components/BirthWeekAndDaySelector";
import { DatePickerMessage } from "../Components/DatePickerMessage";
import { useConversationLogger } from "../hooks/useConversationLogger";
import { takeUntil } from "../utils/arrayUtils";
import { dateToString } from "../utils/dateUtils";
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
    timestamp: new Date(),
    shouldLocalizeData: true,
  };
  const [chatSteps, setChatSteps] = useState<ChatDecisionTreeNode[]>([
    welcomeStep,
  ]);
  const { logConversation } = useConversationLogger(chatSteps);

  const notImplementedYetStepTemplate: ChatDecisionTreeNode = {
    id: -1,
    branchKey: 0,
    parent: null,
    children: [],
    sender: "bot",
    type: "text",
    content: "pathNotReadyYet",
    shouldLocalizeData: true,
    divProps: {
      onClick: logConversation,
      className:
        "transform hover:scale-105 transition-transform duration-50 cursor-pointer",
    },
  };

  const userTypeStep: ChatDecisionTreeNode = {
    id: 1,
    branchKey: 0,
    parent: welcomeStep,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["parent", "highRiskPregnancy", "teamMember", "donator", "other"],
    shouldLocalizeData: true,
  };

  const isBabyStillInHospitalStep: ChatDecisionTreeNode = {
    id: 2,
    branchKey: 0,
    parent: userTypeStep,
    children: [],
    sender: "bot",
    type: "text",
    content: "isStillInNICU",
    shouldLocalizeData: true,
  };

  const isBabyStillInHospitalAnswerStep: ChatDecisionTreeNode = {
    id: 3,
    branchKey: 0,
    parent: isBabyStillInHospitalStep,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["yes", "no"],
    shouldLocalizeData: true,
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
    shouldLocalizeData: true,
  };

  const birthDateStep: ChatDecisionTreeNode = {
    id: 5,
    branchKey: 0,
    parent: whichHospitalStep,
    children: [],
    sender: "user",
    type: "confirmComponent",
    component: DatePickerMessage,
    defaultValue: dateToString(new Date()),
    shouldLocalizeData: false,
  };

  const bornWeekAndDayStep: ChatDecisionTreeNode = {
    id: 6,
    branchKey: 0,
    parent: birthDateStep,
    children: [],
    sender: "user",
    type: "confirmComponent",
    component: BirthWeekAndDaySelector,
    defaultValue: "33 + 0",
    shouldLocalizeData: false,
  };

  const howManyNewbornsStep: ChatDecisionTreeNode = {
    id: 7,
    branchKey: 0,
    parent: bornWeekAndDayStep,
    children: [],
    sender: "bot",
    type: "text",
    content: "numberOfNewborns",
    shouldLocalizeData: true,
  };

  const numOfNewbornsAnswerStep: ChatDecisionTreeNode = {
    id: 8,
    branchKey: 0,
    parent: howManyNewbornsStep,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["1", "2", "3", "4"],
    shouldLocalizeData: false,
  };

  // Wire children:
  welcomeStep.children = [userTypeStep];
  userTypeStep.children = [isBabyStillInHospitalStep, null, null, null, null];
  isBabyStillInHospitalStep.children = [isBabyStillInHospitalAnswerStep];
  isBabyStillInHospitalAnswerStep.children = [whichHospitalStep, null];
  whichHospitalStep.children = [birthDateStep];
  birthDateStep.children = [bornWeekAndDayStep];
  bornWeekAndDayStep.children = [howManyNewbornsStep];
  howManyNewbornsStep.children = [numOfNewbornsAnswerStep];

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
