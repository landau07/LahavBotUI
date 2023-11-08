import { ReactNode } from "react";
import "react-day-picker/dist/style.css";
import { chatSteps } from "./signals";
import { takeUntil } from "./utils/arrayUtils";

export type ChatDecisionTreeNode = {
  id: number;
  parent: ChatDecisionTreeNode | null;
  children: (ChatDecisionTreeNode | null)[];
  branchKey: number; // used to avoid storing state when going back in the flow
  sender: "user" | "bot";
} & (
  | {
      type: "text";
      content: string | ReactNode;
    }
  | {
      type: "selectionBox";
      boxes: string[];
    }
  | {
      type: "dropdown";
      options: string[];
      text: string;
      onOptionSelected?: (boxText: string) => void;
    }
  | {
      type: "date";
    }
);

export const welcomeStep: ChatDecisionTreeNode = {
  id: 0,
  branchKey: 0,
  parent: null,
  children: [],
  sender: "bot",
  type: "text",
  content:
    "היי! הגעתם לבוט של לה״ב. נשמח לסייע ולהפנות אותך לאן שאתה צריך. האם אתה:",
};

const userTypeStep: ChatDecisionTreeNode = {
  id: 1,
  branchKey: 0,
  parent: welcomeStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["הורה לפג", "בהריון בסיכון", "צוות מקצועי", "מעוניין לתרום", "אחר"],
};

const isBabyStillInHospitalStep: ChatDecisionTreeNode = {
  id: 2,
  branchKey: 0,
  parent: userTypeStep,
  children: [],
  sender: "bot",
  type: "text",
  content: "האם התינוק עדין בפגיה?",
};

const isBabyStillInHospitalAnswerStep: ChatDecisionTreeNode = {
  id: 3,
  branchKey: 0,
  parent: isBabyStillInHospitalStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["כן", "לא"],
};

const whichHospitalStep: ChatDecisionTreeNode = {
  id: 4,
  branchKey: 0,
  parent: isBabyStillInHospitalAnswerStep,
  children: [],
  sender: "bot",
  type: "dropdown",
  text: "באיזו פגיה נמצאים?",
  options: [
    "תל השומר",
    "שניידר",
    "רמב״ם",
    "שערי צדק",
    "סורוקה",
    "וולפסדון",
    "סורוקה",
    "אחר",
  ],
};

const birthDateStep: ChatDecisionTreeNode = {
  id: 5,
  branchKey: 0,
  parent: whichHospitalStep,
  children: [],
  sender: "bot",
  type: "text",
  content: "מה תאריך הלידה?",
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
  content: "סורי, עוד לא מימשנו את הנתיב הזה...",
};

welcomeStep.children = [userTypeStep];
userTypeStep.children = [isBabyStillInHospitalStep, null, null, null, null];
isBabyStillInHospitalStep.children = [isBabyStillInHospitalAnswerStep];
isBabyStillInHospitalAnswerStep.children = [whichHospitalStep, null];
whichHospitalStep.children = [birthDateStep];

birthDateStep.children = [birthDateAnswerStep];

export function setNextStep(
  step: ChatDecisionTreeNode,
  childIndex: number = 0
) {
  const nextStep = step.children[childIndex]
    ? { ...step.children[childIndex], branchKey: new Date().getTime() } // Updating the branchKey of the child so it will be rerender in case of going back in flow
    : {
        ...notImplementedYetStepTemplate,
      };

  chatSteps.value = takeUntil(chatSteps.value, (s) => s === step).concat(
    nextStep as ChatDecisionTreeNode
  );
}
