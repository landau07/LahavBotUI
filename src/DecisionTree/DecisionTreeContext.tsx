import { ReactNode, createContext, useState } from "react";
import "react-day-picker/dist/style.css";
import {
  BabiesWeightInput,
  BabiesWeightInputProps,
} from "../Components/BabiesWeightInput";
import { BirthWeekAndDaySelector } from "../Components/BirthWeekAndDaySelector";
import {
  DatePickerMessage,
  DatePickerMessageProps,
} from "../Components/DatePickerMessage";
import {
  DropdownMessage,
  DropdownMessageProps,
} from "../Components/DropdownMessage";
import { HospitalAlumniWhatsapp } from "../Components/ExternalLinkMessage";
import { hospitalLinks } from "../data/hospitalLinks";
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

  const whichHospitalStep: ChatDecisionTreeNode<DropdownMessageProps> = {
    id: 4,
    branchKey: 0,
    parent: isBabyStillInHospitalAnswerStep,
    children: [],
    sender: "bot",
    type: "confirmComponent",
    stepLogQuestion: "whichHospital",
    component: DropdownMessage,
    componentProps: () => ({
      text: "whichHospital",
      options: hospitalLinks().map((h) => h.id),
    }),
    defaultValue: "telHashomer",
    shouldLocalizeData: true,
  };

  const birthDateStep: ChatDecisionTreeNode<DatePickerMessageProps> = {
    id: 5,
    branchKey: 0,
    parent: whichHospitalStep,
    children: [],
    sender: "bot",
    type: "confirmComponent",
    component: DatePickerMessage,
    componentProps: () => ({
      textId: "whatWasTheBirthDate",
    }),
    stepLogQuestion: "whatWasTheBirthDate",
    defaultValue: dateToString(new Date()),
    shouldLocalizeData: false,
  };

  const bornWeekAndDayStep: ChatDecisionTreeNode = {
    id: 6,
    branchKey: 0,
    parent: birthDateStep,
    children: [],
    sender: "bot",
    type: "confirmComponent",
    stepLogQuestion: "whatWasTheBirthWeekAndDay",
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

  const babiesWeightStep: ChatDecisionTreeNode<BabiesWeightInputProps> = {
    id: 9,
    branchKey: 0,
    parent: numOfNewbornsAnswerStep,
    children: [],
    sender: "bot",
    type: "confirmComponent",
    stepLogQuestion: "whatIsTheWeightOfTheBabies",
    component: BabiesWeightInput,
    defaultValue: "",
    shouldLocalizeData: false,
    componentProps: (step) => ({
      numOfBabies: parseInt(step.parentStepData!) as 1 | 2 | 3 | 4 | 5,
    }),
  };

  const onWhichTopicYouNeedAssistanceStep: ChatDecisionTreeNode = {
    id: 10,
    branchKey: 0,
    parent: babiesWeightStep,
    children: [],
    sender: "bot",
    type: "text",
    content: "onWhichTopicYouNeedAssistance",
    shouldLocalizeData: true,
  };

  const assistanceTopicsAnswerStep: ChatDecisionTreeNode = {
    id: 11,
    branchKey: 0,
    parent: onWhichTopicYouNeedAssistanceStep,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["rights", "generalInfo", "contactUs"],
    shouldLocalizeData: true,
  };

  const rightsQuestionsStep: ChatDecisionTreeNode = {
    id: 12,
    branchKey: 0,
    parent: assistanceTopicsAnswerStep,
    children: [],
    sender: "bot",
    type: "text",
    content: "onWhichTopicYouNeedAssistance",
    shouldLocalizeData: true,
  };

  const rightsTopicsStep: ChatDecisionTreeNode = {
    id: 13,
    branchKey: 0,
    parent: rightsQuestionsStep,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: [
      "rsvVaccination",
      "breastMilkBank",
      "extensionOfMaternityLeave",
      "prematurityAllowance",
    ],
    shouldLocalizeData: true,
  };

  const whichNICUWereYouStep: ChatDecisionTreeNode<DropdownMessageProps> = {
    ...whichHospitalStep,
    id: 14,
    componentProps: (s) => ({
      ...whichHospitalStep.componentProps!(s),
      text: "whichHospitalWereYou",
    }),
  };

  const inviteToHospitalAlumniWhatsApp: ChatDecisionTreeNode = {
    id: 15,
    branchKey: 0,
    parent: assistanceTopicsAnswerStep,
    children: [],
    sender: "bot",
    type: "text",
    content: (step) => (
      <HospitalAlumniWhatsapp hospitalNameFormatted={step.parentStepData!} />
    ),
    shouldLocalizeData: true,
  };

  const releaseFromNICUDateStep: ChatDecisionTreeNode<DatePickerMessageProps> =
    {
      ...birthDateStep,
      id: 16,
      parent: inviteToHospitalAlumniWhatsApp,
      stepLogQuestion: "releaseDateFromHospital",
      componentProps: () => ({
        textId: "releaseDateFromHospital",
      }),
    };

  // Wire children:
  welcomeStep.children = [userTypeStep];
  userTypeStep.children = [isBabyStillInHospitalStep, null, null, null, null];
  isBabyStillInHospitalStep.children = [isBabyStillInHospitalAnswerStep];
  isBabyStillInHospitalAnswerStep.children = [
    whichHospitalStep,
    whichNICUWereYouStep,
  ];
  whichHospitalStep.children = [birthDateStep];
  whichNICUWereYouStep.children = [inviteToHospitalAlumniWhatsApp];
  inviteToHospitalAlumniWhatsApp.children = [releaseFromNICUDateStep];
  releaseFromNICUDateStep.children = [birthDateStep];
  birthDateStep.children = [bornWeekAndDayStep];
  bornWeekAndDayStep.children = [howManyNewbornsStep];
  howManyNewbornsStep.children = [numOfNewbornsAnswerStep];
  numOfNewbornsAnswerStep.children = [
    babiesWeightStep,
    babiesWeightStep,
    babiesWeightStep,
    babiesWeightStep,
  ];
  babiesWeightStep.children = [onWhichTopicYouNeedAssistanceStep];
  onWhichTopicYouNeedAssistanceStep.children = [assistanceTopicsAnswerStep];
  assistanceTopicsAnswerStep.children = [rightsQuestionsStep, null, null, null];
  rightsQuestionsStep.children = [rightsTopicsStep];

  const setNextStep = (step: ChatDecisionTreeNode, childIndex: number = 0) => {
    let nextStep: ChatDecisionTreeNode | null = step.children[childIndex];
    if (nextStep) {
      Object.assign<ChatDecisionTreeNode, Partial<ChatDecisionTreeNode>>(
        nextStep,
        {
          // Updating the branchKey of the child so it will be rerender in case of going back in flow
          branchKey: new Date().getTime(),
          parentStepData: step.stepResult,
        }
      );
    } else {
      nextStep = notImplementedYetStepTemplate;
    }

    setChatSteps((prev) =>
      takeUntil(prev, (s) => s === step).concat(nextStep!)
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
