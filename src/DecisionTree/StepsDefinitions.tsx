import { Frown, Info, Smile, UserPlus, Users } from "react-feather";
import { FormattedMessage } from "react-intl";
import {
  BabiesWeightInput,
  BabiesWeightInputProps,
} from "../Components/BabiesWeightInput";
import { BirthWeekAndDaySelector } from "../Components/BirthWeekAndDaySelector";
import { BreastMilkEligibilityResult } from "../Components/BreastMilkEligibilityResult";
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
import { PrematureAllowanceResult } from "../Components/PrematureAllowanceResult";
import { RsvCalculationResult } from "../Components/RsvCalculationResult";
import { TypingAnimationHOC } from "../Components/TypingAnimationHOC";
import { hospitalLinks } from "../data/hospitalLinks";
import facebookIcon from "../icons/facebookIcon.jpeg";
import milkBottleIcon from "../icons/milkBottleIcon.png";
import octopusIcon from "../icons/octopusIcon.png";
import whatsAppIcon from "../icons/whatsappIcon.png";
import { cn } from "../utils/classnames";
import { dateToString, stringToDate } from "../utils/dateUtils";
import { linkColor } from "../utils/sharedClassNames";
import { ChatDecisionTreeNode } from "./types";

export const welcomeStep: ChatDecisionTreeNode = {
  id: 0,
  branchKey: 0,
  parent: null,
  children: [],
  sender: "bot",
  type: "text",
  content: "welcomeMessage",
  shouldLocalizeData: true,
};

export const areYouStep: ChatDecisionTreeNode = {
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

export const notImplementedYetStepTemplate: ChatDecisionTreeNode = {
  id: -1,
  branchKey: 0,
  parent: null,
  children: [],
  sender: "bot",
  type: "text",
  content: "pathNotReadyYet",
  shouldLocalizeData: true,
  divProps: {
    className: "transform hover:scale-105 transition-transform duration-50",
  },
};

export const userTypeStep: ChatDecisionTreeNode = {
  id: 1,
  branchKey: 0,
  parent: areYouStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["parent", "highRiskPregnancy", "teamMember", "donator", "other"],
  shouldLocalizeData: true,
};

export const isBabyStillInHospitalStep: ChatDecisionTreeNode = {
  id: 2,
  branchKey: 0,
  parent: userTypeStep,
  children: [],
  sender: "bot",
  type: "text",
  content: "isStillInNICU",
  shouldLocalizeData: true,
};

export const isBabyStillInHospitalAnswerStep: ChatDecisionTreeNode = {
  id: 3,
  branchKey: 0,
  parent: isBabyStillInHospitalStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["yes", "no"],
  shouldLocalizeData: true,
};

export const whichHospitalStep: ChatDecisionTreeNode<DropdownMessageProps> = {
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

export const birthDateStep: ChatDecisionTreeNode<DatePickerMessageProps> = {
  id: 5,
  branchKey: 0,
  parent: whichHospitalStep,
  children: [],
  sender: "bot",
  type: "confirmComponent",
  component: DatePickerMessage,
  componentProps: (step) => {
    const toDate =
      step.parent!.id === releaseFromNICUDateStep.id
        ? stringToDate(step.parent!.result?.value)!
        : new Date();
    return {
      textId: "whatWasTheBirthDate",
      toDate,
    };
  },
  stepLogQuestion: "whatWasTheBirthDate",
  defaultValue: dateToString(new Date()),
  shouldLocalizeData: false,
};

export const bornWeekAndDayStep: ChatDecisionTreeNode = {
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

export const howManyNewbornsStep: ChatDecisionTreeNode = {
  id: 7,
  branchKey: 0,
  parent: bornWeekAndDayStep,
  children: [],
  sender: "bot",
  type: "text",
  content: "numberOfNewborns",
  shouldLocalizeData: true,
};

export const numOfNewbornsAnswerStep: ChatDecisionTreeNode = {
  id: 8,
  branchKey: 0,
  parent: howManyNewbornsStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["1", "2", "3", "4"],
  shouldLocalizeData: false,
};

export const babiesWeightStep: ChatDecisionTreeNode<BabiesWeightInputProps> = {
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
    numOfBabies: parseInt(step.parent!.result!.value!) as 1 | 2 | 3 | 4 | 5,
  }),
};

export const onWhichTopicYouNeedAssistanceStep: ChatDecisionTreeNode = {
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

export const assistanceTopicsAnswerStep: ChatDecisionTreeNode = {
  id: 11,
  branchKey: 0,
  parent: onWhichTopicYouNeedAssistanceStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["rights", "generalInfo", "contactUs"],
  shouldLocalizeData: true,
};

export const rightsQuestionsStep: ChatDecisionTreeNode = {
  id: 12,
  branchKey: 0,
  parent: assistanceTopicsAnswerStep,
  children: [],
  sender: "bot",
  type: "text",
  content: "onWhichTopicYouNeedAssistance",
  shouldLocalizeData: true,
};

export const rightsTopicsStep: ChatDecisionTreeNode = {
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

export const whichNICUWereYouStep: ChatDecisionTreeNode<DropdownMessageProps> =
  {
    ...whichHospitalStep,
    id: 14,
    componentProps: (s) => ({
      ...whichHospitalStep.componentProps!(s),
      text: "whichHospitalWereYou",
    }),
  };

export const inviteToHospitalAlumniWhatsApp: ChatDecisionTreeNode = {
  id: 15,
  branchKey: 0,
  parent: whichNICUWereYouStep,
  children: [],
  sender: "bot",
  type: "text",
  content: () => <HospitalWhatsApp whatsAppGroupType="alumni" />,
  shouldLocalizeData: true,
};

export const releaseFromNICUDateStep: ChatDecisionTreeNode<DatePickerMessageProps> =
  {
    ...birthDateStep,
    id: 16,
    parent: inviteToHospitalAlumniWhatsApp,
    stepLogQuestion: "releaseDateFromHospital",
    componentProps: () => ({
      textId: "releaseDateFromHospital",
      toDate: new Date(),
    }),
  };

export const whatWouldYouLikeQuestion: ChatDecisionTreeNode = {
  id: 17,
  type: "text",
  sender: "bot",
  branchKey: 0,
  parent: rightsTopicsStep,
  children: [],
  content: "whatWouldYouLike",
  shouldLocalizeData: true,
};

export const breastMilkBankAnswer: ChatDecisionTreeNode = {
  id: 18,
  branchKey: 0,
  parent: whatWouldYouLikeQuestion,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["iNeedBreastMilk", "iDonateBreastMilk"],
  shouldLocalizeData: true,
};

export const isInHospitalOver14DaysQuestion: ChatDecisionTreeNode = {
  id: 19,
  type: "text",
  sender: "bot",
  branchKey: 0,
  parent: rightsTopicsStep,
  children: [],
  content: "isInHospitalOver14Days",
  shouldLocalizeData: true,
};

export const isInHospitalOver14DaysAnswer: ChatDecisionTreeNode = {
  id: 20,
  branchKey: 0,
  parent: rightsTopicsStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["yes", "no"],
  shouldLocalizeData: true,
};

export const motherHospitalizedBeforeBirthQuestion: ChatDecisionTreeNode = {
  id: 21,
  type: "text",
  sender: "bot",
  branchKey: 0,
  parent: isInHospitalOver14DaysAnswer,
  children: [],
  content: "motherHospitalizedBeforeBirth",
  shouldLocalizeData: true,
};

export const motherHospitalizedBeforeBirthAnswer: ChatDecisionTreeNode = {
  id: 22,
  branchKey: 0,
  parent: motherHospitalizedBeforeBirthQuestion,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["yes", "no"],
  shouldLocalizeData: true,
};

export const isOver14DaysInNicuYesResult: ChatDecisionTreeNode = {
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
      icon={<Info className={linkColor} />}
    />
  ),
};

export const wantToDonateMilkLinkInfo: ChatDecisionTreeNode = {
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

export const generalInfoLink: ChatDecisionTreeNode = {
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
      icon={<Info className={linkColor} />}
    />
  ),
};

export const joinOurFacebookStep: ChatDecisionTreeNode = {
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

export const inviteToHospitalWhatsApp: ChatDecisionTreeNode = {
  id: 27,
  branchKey: 0,
  parent: joinOurFacebookStep,
  children: [],
  sender: "bot",
  type: "text",
  content: () => <HospitalWhatsApp whatsAppGroupType="currentlyInHospital" />,
  shouldLocalizeData: true,
};

export const motherWasHospitalizedBeforeBirthAnswer: ChatDecisionTreeNode = {
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
      icon={<Smile className={linkColor} />}
    />
  ),
};

export const motherWasNotHospitalizedBeforeBirthAnswer: ChatDecisionTreeNode = {
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
      icon={<Frown className={linkColor} />}
    />
  ),
};

export const haveYouHadPrematureBabyBeforeQuestion: ChatDecisionTreeNode = {
  id: 30,
  type: "text",
  sender: "bot",
  branchKey: 0,
  parent: userTypeStep,
  children: [],
  content: "haveYouHadPrematureBabyBefore",
  shouldLocalizeData: true,
};

export const haveYouHadPrematureBabyBeforeOptions: ChatDecisionTreeNode = {
  id: 31,
  branchKey: 0,
  parent: haveYouHadPrematureBabyBeforeQuestion,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["yes", "no"],
  shouldLocalizeData: true,
};

export const hadPrematureBabyBeforeYesAnswer: ChatDecisionTreeNode = {
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

export const hadPrematureBabyBeforeNoAnswer: ChatDecisionTreeNode = {
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

export const wantToJoinTheTeamLink: ChatDecisionTreeNode = {
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
      icon={<UserPlus className={linkColor} />}
    />
  ),
};

export const howWouldYouLikeToDonateQuestion: ChatDecisionTreeNode = {
  id: 33,
  type: "text",
  sender: "bot",
  branchKey: 0,
  parent: userTypeStep,
  children: [],
  content: "wantToDonateMessage",
  shouldLocalizeData: true,
};

export const donationOptions: ChatDecisionTreeNode = {
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

export const donationOptionLink: ChatDecisionTreeNode = {
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
    const selectedDonationMethod = step.parent?.result?.value;

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

export const joinUsFinalStep: ChatDecisionTreeNode = {
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
      icon={<Users className={linkColor} />}
    />
  ),
};

export const feedbackStep: ChatDecisionTreeNode = {
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

export const openTextFeedbackStep: ChatDecisionTreeNode = {
  id: 38,
  branchKey: 0,
  parent: feedbackStep,
  children: [],
  sender: "bot",
  type: "text",
  shouldLocalizeData: true,
  content: "openFeedbackText",
};

export const howCanWeHelpYouQuestion: ChatDecisionTreeNode = {
  id: 39,
  branchKey: 0,
  parent: assistanceTopicsAnswerStep,
  children: [],
  sender: "bot",
  type: "text",
  shouldLocalizeData: true,
  content: (
    <ExternalLinkMessage
      url={"https://bit.ly/טופס_פנייה"}
      children={<FormattedMessage id="howCanWeHelpYou" />}
      urlText={<FormattedMessage id="orFillThisForm" />}
    />
  ),
  shouldWaitForUserInputAfterStep: true,
};

export const whatAreYouInterestedAboutQuestion: ChatDecisionTreeNode = {
  id: 40,
  branchKey: 0,
  parent: userTypeStep,
  children: [],
  sender: "bot",
  type: "text",
  shouldLocalizeData: true,
  content: "whatAreYouInterestedAbout",
};

export const whatAreYouInterestedAboutOptions: ChatDecisionTreeNode = {
  id: 41,
  branchKey: 0,
  parent: whatAreYouInterestedAboutQuestion,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["breastMilkDonation", "projectOctopus", "contactUs"],
  shouldLocalizeData: true,
};

export const projectOctopusLink: ChatDecisionTreeNode = {
  id: 42,
  branchKey: 0,
  parent: whatAreYouInterestedAboutOptions,
  children: [],
  sender: "bot",
  type: "text",
  shouldLocalizeData: true,
  content: (
    <ExternalLinkMessage
      url={"https://pagim.net/octopus"}
      children={<FormattedMessage id="projectOctopusInfo" />}
      urlText={<FormattedMessage id="clickHere" />}
      icon={octopusIcon}
    />
  ),
};

export const rsvCalculationResult: ChatDecisionTreeNode = {
  id: 43,
  branchKey: 0,
  parent: rightsTopicsStep,
  type: "text",
  sender: "bot",
  shouldLocalizeData: true,
  content: (
    <TypingAnimationHOC>
      <RsvCalculationResult />
    </TypingAnimationHOC>
  ),
  preventAutoRenderBotChild: true,
  children: [],
};

export const rsvMoreDetailsLink: ChatDecisionTreeNode = {
  id: 44,
  branchKey: 0,
  parent: rsvCalculationResult,
  children: [],
  sender: "bot",
  type: "text",
  shouldLocalizeData: true,
  content: (step) => (
    <ExternalLinkMessage
      url={"https://pagim.net/rsv"}
      children={
        step.parent!.result?.value == "NotEligible" && (
          <div className="flex gap-3 p-2 pe-4 ">
            <Info className="text-blue-500" />
            <FormattedMessage id="checkTheLinkForSpecialCircumstances" />
          </div>
        )
      }
      urlText={
        <div
          className={cn(step.parent!.result?.value == "NotEligible" && "ms-10")}
        >
          <FormattedMessage
            id={
              step.parent!.result?.value === "Eligible"
                ? "forAdditionalDetailsClickHere"
                : "clickHere"
            }
          />
        </div>
      }
    />
  ),
};

export const needBreastMilkResult: ChatDecisionTreeNode = {
  id: 45,
  branchKey: 0,
  parent: breastMilkBankAnswer,
  type: "text",
  sender: "bot",
  shouldLocalizeData: true,
  content: (
    <TypingAnimationHOC>
      <BreastMilkEligibilityResult />
    </TypingAnimationHOC>
  ),
  preventAutoRenderBotChild: true,
  children: [],
};

export const wasThisHelpfulQuestion: ChatDecisionTreeNode = {
  id: 46,
  type: "text",
  sender: "bot",
  branchKey: 0,
  parent: needBreastMilkResult,
  children: [],
  content: "wasThisHelpful",
  shouldLocalizeData: true,
};

export const wasThisHelpfulOptions: ChatDecisionTreeNode = {
  id: 47,
  branchKey: 0,
  parent: wasThisHelpfulQuestion,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["yesThanks", "iWantToLeaveAMessage"],
  shouldLocalizeData: true,
};

export const prematurityAllowanceResultStep: ChatDecisionTreeNode = {
  id: 48,
  branchKey: 0,
  parent: rightsTopicsStep,
  type: "text",
  sender: "bot",
  shouldLocalizeData: true,
  content: (
    <TypingAnimationHOC>
      <PrematureAllowanceResult />
    </TypingAnimationHOC>
  ),
  preventAutoRenderBotChild: true,
  children: [],
};

export const prematurityAllowanceEligibleLink: ChatDecisionTreeNode = {
  id: 49,
  branchKey: 0,
  parent: prematurityAllowanceResultStep,
  children: [],
  sender: "bot",
  type: "text",
  shouldLocalizeData: true,
  content: (
    <ExternalLinkMessage
      url={"https://pagim.net/עיקרי-הכללים-לקביעת-זכאות-לקצבה-מביטו"}
      children={<FormattedMessage id="submittingPrematurityAllowanceLink" />}
      urlText={<FormattedMessage id="clickHere" />}
      icon={<Smile className={linkColor} />}
    />
  ),
};

export const sendUsMessageQuestion: ChatDecisionTreeNode = {
  id: 50,
  branchKey: 0,
  parent: prematurityAllowanceEligibleLink,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["yes", "no"],
  shouldLocalizeData: true,
};

// Wire children:
welcomeStep.children = [areYouStep];
areYouStep.children = [userTypeStep];
userTypeStep.children = [
  isBabyStillInHospitalStep,
  haveYouHadPrematureBabyBeforeQuestion,
  wantToJoinTheTeamLink,
  howWouldYouLikeToDonateQuestion,
  whatAreYouInterestedAboutQuestion,
];
isBabyStillInHospitalStep.children = [isBabyStillInHospitalAnswerStep];
isBabyStillInHospitalAnswerStep.children = [
  whichHospitalStep,
  whichNICUWereYouStep,
];
birthDateStep.children = [bornWeekAndDayStep];
whichHospitalStep.children = [{ ...birthDateStep, parent: whichHospitalStep }];
whichNICUWereYouStep.children = [inviteToHospitalAlumniWhatsApp];
inviteToHospitalAlumniWhatsApp.children = [releaseFromNICUDateStep];

releaseFromNICUDateStep.children = [
  { ...birthDateStep, parent: releaseFromNICUDateStep },
];
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
  howCanWeHelpYouQuestion,
];
rightsQuestionsStep.children = [rightsTopicsStep];
rightsTopicsStep.children = [
  rsvCalculationResult,
  whatWouldYouLikeQuestion,
  isInHospitalOver14DaysQuestion,
  prematurityAllowanceResultStep,
];
rsvCalculationResult.children = [rsvMoreDetailsLink];
rsvMoreDetailsLink.children = [wasThisHelpfulQuestion];
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
breastMilkBankAnswer.children = [
  needBreastMilkResult,
  wantToDonateMilkLinkInfo,
];
motherWasNotHospitalizedBeforeBirthAnswer.children = [wasThisHelpfulQuestion];
wantToDonateMilkLinkInfo.children = [joinOurFacebookStep];
prematurityAllowanceResultStep.children = [
  prematurityAllowanceEligibleLink,
  sendUsMessageQuestion,
];
prematurityAllowanceEligibleLink.children = [wasThisHelpfulQuestion];
sendUsMessageQuestion.children = [howCanWeHelpYouQuestion, joinOurFacebookStep];
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
whatAreYouInterestedAboutQuestion.children = [whatAreYouInterestedAboutOptions];
whatAreYouInterestedAboutOptions.children = [
  { ...wantToDonateMilkLinkInfo, children: [] },
  projectOctopusLink,
  { ...howCanWeHelpYouQuestion, parent: whatAreYouInterestedAboutOptions },
];
needBreastMilkResult.children = [wasThisHelpfulQuestion];
wasThisHelpfulQuestion.children = [wasThisHelpfulOptions];
wasThisHelpfulOptions.children = [
  joinOurFacebookStep,
  { ...howCanWeHelpYouQuestion, parent: wasThisHelpfulOptions },
];
