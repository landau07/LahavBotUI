import { ReactNode, createContext, useState } from "react";
import "react-day-picker/dist/style.css";
import { Frown, Info, Smile, UserPlus, Users } from "react-feather";
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
import { ExternalLinkMessage } from "../Components/ExternalLinkMessage";
import { FeedbackMessage } from "../Components/FeedbackMessage";
import { HospitalWhatsApp } from "../Components/HospitalWhatsApp";
import { hospitalLinks } from "../data/hospitalLinks";
import { useConversationLogger } from "../hooks/useConversationLogger";
import facebookIcon from "../icons/facebookIcon.jpeg";
import milkBottleIcon from "../icons/milkBottleIcon.png";
import whatsAppIcon from "../icons/whatsappIcon.png";
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
  const { logConversation } = useConversationLogger();

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
      onClick: () => logConversation(chatSteps),
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
      numOfBabies: parseInt(step.parent!.stepResult!.value!) as
        | 1
        | 2
        | 3
        | 4
        | 5,
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
    content: () => <HospitalWhatsApp whatsAppGroupType="alumni" />,
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
        url={"https://pagim.net/בנק-חלב-אם"}
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
        url={"https://pagim.net/הורים-לפגים"}
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

  const inviteToHospitalWhatsApp: ChatDecisionTreeNode = {
    id: 27,
    branchKey: 0,
    parent: joinOurFacebookStep,
    children: [],
    sender: "bot",
    type: "text",
    content: () => <HospitalWhatsApp whatsAppGroupType="currentlyInHospital" />,
    shouldLocalizeData: true,
  };

  const motherWasHospitalizedBeforeBirthAnswer: ChatDecisionTreeNode = {
    id: 28,
    branchKey: 0,
    parent: motherHospitalizedBeforeBirthAnswer,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://pagim.net/הארכת-חופשת-לידה-של-אם-לפג"}
        children={<FormattedMessage id="motherWasHospitalizedBeforeBirth" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={<Smile className="text-blue-500" />}
      />
    ),
  };

  const motherWasNotHospitalizedBeforeBirthAnswer: ChatDecisionTreeNode = {
    id: 29,
    branchKey: 0,
    parent: motherHospitalizedBeforeBirthAnswer,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://pagim.net/הארכת-חופשת-לידה-של-אם-לפג"}
        children={<FormattedMessage id="motherWasNotHospitalizedBeforeBirth" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={<Frown className="text-blue-500" />}
      />
    ),
  };

  const haveYouHadPrematureBabyBeforeQuestion: ChatDecisionTreeNode = {
    id: 30,
    type: "text",
    sender: "bot",
    branchKey: 0,
    parent: userTypeStep,
    children: [],
    content: "haveYouHadPrematureBabyBefore",
    shouldLocalizeData: true,
  };

  const haveYouHadPrematureBabyBeforeOptions: ChatDecisionTreeNode = {
    id: 31,
    branchKey: 0,
    parent: haveYouHadPrematureBabyBeforeQuestion,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: ["yes", "no"],
    shouldLocalizeData: true,
  };

  const hadPrematureBabyBeforeYesAnswer: ChatDecisionTreeNode = {
    id: 32,
    branchKey: 0,
    parent: assistanceTopicsAnswerStep,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://chat.whatsapp.com/DUZhJIMp69x69Z4EdUuZzz"}
        children={<FormattedMessage id="joinWhatsappForAfterPrematureBirth" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={whatsAppIcon}
      />
    ),
  };

  const hadPrematureBabyBeforeNoAnswer: ChatDecisionTreeNode = {
    id: 32,
    branchKey: 0,
    parent: assistanceTopicsAnswerStep,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://chat.whatsapp.com/GGeRf9NQoLpALVbzatFDOL"}
        children={<FormattedMessage id="joinWhatsappForPregnantWomenAtRisk" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={whatsAppIcon}
      />
    ),
  };

  const wantToJoinTheTeamLink: ChatDecisionTreeNode = {
    id: 33,
    branchKey: 0,
    parent: userTypeStep,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://forms.monday.com/forms/94de7af1b9b226991b52456515eb655b"}
        children={<FormattedMessage id="wantToJoinTheTeamMessage" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={<UserPlus className="text-blue-500" />}
      />
    ),
  };

  const howWouldYouLikeToDonateQuestion: ChatDecisionTreeNode = {
    id: 33,
    type: "text",
    sender: "bot",
    branchKey: 0,
    parent: userTypeStep,
    children: [],
    content: "wantToDonateMessage",
    shouldLocalizeData: true,
  };

  const donationOptions: ChatDecisionTreeNode = {
    id: 34,
    branchKey: 0,
    parent: howWouldYouLikeToDonateQuestion,
    children: [],
    sender: "user",
    type: "selectionBox",
    boxes: [
      "creditCardOneTime",
      "creditCardMonthly",
      "bit",
      "donationsFromAbroad",
      "otherDonationOptions",
    ],
    shouldLocalizeData: true,
  };

  const donationOptionLink: ChatDecisionTreeNode = {
    id: 35,
    branchKey: 0,
    parent: donationOptions,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (step) => {
      const donationMethodToLinkMap: Record<string, string> = {
        creditCardOneTime: "https://pay.sumit.co.il/27bvg5/27d9pd/c/payment/",
        creditCardMonthly: "https://pay.sumit.co.il/27bvg5/27d7k6/c/payment/",
        bit: "https://www.jgive.com/new/he/ils/charity-organizations/848/projects",
        donationsFromAbroad:
          "https://www.jgive.com/new/en/usd/charity-organizations/848/projects",
      };
      const donationMethodToTextMap: Record<string, string> = {
        creditCardOneTime: "wonderful",
        creditCardMonthly: "amazing",
        bit: "perfect",
        donationsFromAbroad: "veryAppreciated",
      };
      const selectedDonationMethod = step.parent?.stepResult?.value;

      return (
        <ExternalLinkMessage
          url={donationMethodToLinkMap[selectedDonationMethod!]}
          children={
            <FormattedMessage
              id={donationMethodToTextMap[selectedDonationMethod!]}
            />
          }
          urlText={<FormattedMessage id="clickHere" />}
        />
      );
    },
  };

  const joinUsFinalStep: ChatDecisionTreeNode = {
    id: 36,
    branchKey: 0,
    parent: inviteToHospitalWhatsApp,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: (
      <ExternalLinkMessage
        url={"https://pagim.net/הצטרפות-לעמותת-להב/"}
        children={<FormattedMessage id="joinUsMessage" />}
        urlText={<FormattedMessage id="clickHere" />}
        icon={<Users className="text-blue-500" />}
      />
    ),
  };

  const feedbackStep: ChatDecisionTreeNode = {
    id: 37,
    branchKey: 0,
    parent: joinUsFinalStep,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    preventAutoRenderBotChild: true,
    content: <FeedbackMessage />,
  };

  const openTextFeedbackStep: ChatDecisionTreeNode = {
    id: 38,
    branchKey: 0,
    parent: feedbackStep,
    children: [],
    sender: "bot",
    type: "text",
    shouldLocalizeData: true,
    content: "openFeedbackText",
  };

  // Wire children:
  welcomeStep.children = [areYouStep];
  areYouStep.children = [userTypeStep];
  userTypeStep.children = [
    isBabyStillInHospitalStep,
    haveYouHadPrematureBabyBeforeQuestion,
    wantToJoinTheTeamLink,
    howWouldYouLikeToDonateQuestion,
    null,
  ];
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
  isOver14DaysInNicuYesResult.children = [joinOurFacebookStep];
  motherHospitalizedBeforeBirthQuestion.children = [
    motherHospitalizedBeforeBirthAnswer,
  ];
  motherHospitalizedBeforeBirthAnswer.children = [
    motherWasHospitalizedBeforeBirthAnswer,
    motherWasNotHospitalizedBeforeBirthAnswer,
  ];
  motherWasHospitalizedBeforeBirthAnswer.children = [joinOurFacebookStep];
  breastMilkBankAnswer.children = [null, wantToDonateMilkLinkInfo];
  wantToDonateMilkLinkInfo.children = [joinOurFacebookStep];
  generalInfoLink.children = [joinOurFacebookStep];
  joinOurFacebookStep.children = [inviteToHospitalWhatsApp];
  haveYouHadPrematureBabyBeforeQuestion.children = [
    haveYouHadPrematureBabyBeforeOptions,
  ];
  haveYouHadPrematureBabyBeforeOptions.children = [
    hadPrematureBabyBeforeYesAnswer,
    hadPrematureBabyBeforeNoAnswer,
  ];
  howWouldYouLikeToDonateQuestion.children = [donationOptions];
  donationOptions.children = [
    donationOptionLink,
    donationOptionLink,
    donationOptionLink,
    donationOptionLink,
    null,
  ];
  inviteToHospitalWhatsApp.children = [joinUsFinalStep];
  joinUsFinalStep.children = [feedbackStep];
  feedbackStep.children = [openTextFeedbackStep];

  const setNextStep = (step: ChatDecisionTreeNode, childIndex: number = 0) => {
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

    setChatSteps((prev) =>
      takeUntil(prev, (s) => s === step).concat(nextStep!)
    );
  };

  const pushNewSteps = (...newSteps: ChatDecisionTreeNode[]) => {
    setChatSteps((prev) => prev.concat(...newSteps));
  };

  const getStepResult = (stepId: number) => {
    const step = chatSteps.find((s) => s.id === stepId);
    return step?.stepResult;
  };

  const contextValue: DecisionTreeContextType = {
    chatSteps,
    setNextStep,
    getStepResult,
    pushNewStep: pushNewSteps,
  };

  return (
    <DecisionTreeContext.Provider value={contextValue}>
      {children}
    </DecisionTreeContext.Provider>
  );
}
