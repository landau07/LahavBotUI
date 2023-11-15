import { ReactNode, createContext, useState } from "react";
import "react-day-picker/dist/style.css";
import { Info } from "react-feather";
import { FormattedMessage } from "react-intl";
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
import {
  ExternalLinkMessage,
  HospitalAlumniWhatsapp,
} from "../Components/ExternalLinkMessage";
import { hospitalLinks } from "../data/hospitalLinks";
import { useConversationLogger } from "../hooks/useConversationLogger";
import facebookIcon from "../icons/facebookIcon.jpeg";
import milkBottleIcon from "../icons/milkBottleIcon.png";
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
    shouldLocalizeData: true,
  };
  const [chatSteps, setChatSteps] = useState<ChatDecisionTreeNode[]>([
    welcomeStep,
  ]);
  const { logConversation } = useConversationLogger(chatSteps);

  const areYouStep: ChatDecisionTreeNode = {
    id: 0.5,
    branchKey: 0,
    parent: welcomeStep,
    children: [],
    sender: "bot",
    type: "text",
    content: "areYou",
    timestamp: new Date(),
    shouldLocalizeData: true,
  };

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
    parent: areYouStep,
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
    timestamp: new Date(),
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
    parent: whichNICUWereYouStep,
    children: [],
    sender: "bot",
    type: "text",
    content: (step) => (
      <HospitalAlumniWhatsapp
        hospitalNameFormatted={step.parentStepData!}
        whatsAppGroupType="alumni"
      />
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

  const whatWouldYouLikeQuestion: ChatDecisionTreeNode = {
    id: 17,
    type: "text",
    sender: "bot",
    branchKey: 0,
    parent: rightsTopicsStep,
    children: [],
    content: "whatWouldYouLike",
    shouldLocalizeData: true,
  };

  const breastMilkBankAnswer: ChatDecisionTreeNode = {
    id: 18,
    branchKey: 0,
    parent: whatWouldYouLikeQuestion,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["iNeedBreastMilk", "iDonateBreastMilk"],
    shouldLocalizeData: true,
  };

  const isInHospitalOver14DaysQuestion: ChatDecisionTreeNode = {
    id: 19,
    type: "text",
    sender: "bot",
    branchKey: 0,
    parent: rightsTopicsStep,
    children: [],
    content: "isInHospitalOver14Days",
    shouldLocalizeData: true,
  };

  const isInHospitalOver14DaysAnswer: ChatDecisionTreeNode = {
    id: 20,
    branchKey: 0,
    parent: rightsTopicsStep,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["yes", "no"],
    shouldLocalizeData: true,
  };

  const motherHospitalizedBeforeBirthQuestion: ChatDecisionTreeNode = {
    id: 21,
    type: "text",
    sender: "bot",
    branchKey: 0,
    parent: isInHospitalOver14DaysAnswer,
    children: [],
    content: "motherHospitalizedBeforeBirth",
    shouldLocalizeData: true,
  };

  const motherHospitalizedBeforeBirthAnswer: ChatDecisionTreeNode = {
    id: 22,
    branchKey: 0,
    parent: motherHospitalizedBeforeBirthQuestion,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["yes", "no"],
    shouldLocalizeData: true,
  };

  const isOver14DaysInNicuYesResult: ChatDecisionTreeNode = {
    id: 23,
    branchKey: 0,
    parent: isInHospitalOver14DaysAnswer,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://pagim.net/הארכת-חופשת-לידה-של-אם-לפג"}
        children={<FormattedMessage id="isOver14DaysInNicuYesResult" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={<Info className="text-blue-500" />}
      />
    ),
  };

  const wantToDonateMilkLinkInfo: ChatDecisionTreeNode = {
    id: 24,
    branchKey: 0,
    parent: isInHospitalOver14DaysAnswer,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://pagim.net/בנק-חלב-אם/"}
        children={<FormattedMessage id="thankYouAllInfoIsHere" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={milkBottleIcon}
      />
    ),
  };

  const generalInfoLink: ChatDecisionTreeNode = {
    id: 25,
    branchKey: 0,
    parent: assistanceTopicsAnswerStep,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://pagim.net/בנק-חלב-אם"}
        children={<FormattedMessage id="hereAllTheDetailsYouNeed" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={<Info className="text-blue-500" />}
      />
    ),
  };

  const joinOurFacebookStep: ChatDecisionTreeNode = {
    id: 26,
    branchKey: 0,
    parent: generalInfoLink,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://www.facebook.com/groups/pagim"}
        children={<FormattedMessage id="facebookGroupInvite" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={facebookIcon}
      />
    ),
  };

  // Wire children:
  welcomeStep.children = [areYouStep];
  areYouStep.children = [userTypeStep];
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
  assistanceTopicsAnswerStep.children = [
    rightsQuestionsStep,
    generalInfoLink,
    null,
  ];
  rightsQuestionsStep.children = [rightsTopicsStep];
  rightsTopicsStep.children = [
    null,
    whatWouldYouLikeQuestion,
    isInHospitalOver14DaysQuestion,
    null,
  ];
  whatWouldYouLikeQuestion.children = [breastMilkBankAnswer];
  isInHospitalOver14DaysQuestion.children = [isInHospitalOver14DaysAnswer];
  isInHospitalOver14DaysAnswer.children = [
    isOver14DaysInNicuYesResult,
    motherHospitalizedBeforeBirthQuestion,
  ];
  motherHospitalizedBeforeBirthQuestion.children = [
    motherHospitalizedBeforeBirthAnswer,
  ];
  breastMilkBankAnswer.children = [null, wantToDonateMilkLinkInfo];
  generalInfoLink.children = [joinOurFacebookStep];

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
