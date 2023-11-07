import { signal } from "@preact/signals-react";
import { ReactNode } from "react";
import "react-day-picker/dist/style.css";
import { takeUntil } from "./utils/arrayUtils";

export type ChatDecisionTreeNode = {
  id: number;
  parent: ChatDecisionTreeNode | null;
  children: ChatDecisionTreeNode[];
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
  parent: null,
  children: [],
  sender: "bot",
  type: "text",
  content:
    "היי! הגעתם לבוט של לה״ב. נשמח לסייע ולהפנות אותך לאן שאתה צריך. האם אתה:",
};

const userTypeStep: ChatDecisionTreeNode = {
  id: 1,
  parent: welcomeStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["הורה לפג", "בהריון בסיכון", "צוות מקצועי", "מעוניין לתרום", "אחר"],
};

const isBabyStillInHospitalStep: ChatDecisionTreeNode = {
  id: 2,
  parent: userTypeStep,
  children: [],
  sender: "bot",
  type: "text",
  content: "האם התינוק עדין בפגיה?",
};

const isBabyStillInHospitalAnswerStep: ChatDecisionTreeNode = {
  id: 3,
  parent: isBabyStillInHospitalStep,
  children: [],
  sender: "user",
  type: "selectionBox",
  boxes: ["כן", "לא"],
};

const whichHospitalStep: ChatDecisionTreeNode = {
  id: 4,
  parent: isBabyStillInHospitalAnswerStep,
  children: [],
  sender: "user",
  type: "dropdown",
  text: "באיזו פגיה נמצאים?",
  options: [
    "תל השומר",
    "שיבא",
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
  parent: whichHospitalStep,
  children: [],
  sender: "bot",
  type: "text",
  content: "מה תאריך הלידה?",
};

const birthDateAnswerStep: ChatDecisionTreeNode = {
  id: 6,
  parent: birthDateStep,
  children: [],
  sender: "user",
  type: "date",
};

const notImplementedYetStepTemplate: ChatDecisionTreeNode = {
  id: -1,
  parent: userTypeStep,
  children: [],
  sender: "bot",
  type: "text",
  content: "סורי, עוד לא מימשנו את הנתיב הזה...",
};

welcomeStep.children = [userTypeStep];
userTypeStep.children = [
  isBabyStillInHospitalStep,
  { ...notImplementedYetStepTemplate },
  { ...notImplementedYetStepTemplate },
  { ...notImplementedYetStepTemplate },
  { ...notImplementedYetStepTemplate },
];
isBabyStillInHospitalStep.children = [isBabyStillInHospitalAnswerStep];
isBabyStillInHospitalAnswerStep.children = [
  whichHospitalStep,
  { ...notImplementedYetStepTemplate },
];
whichHospitalStep.children = [birthDateStep];

birthDateStep.children = [birthDateAnswerStep];

export const chatSteps = signal<ChatDecisionTreeNode[]>([
  welcomeStep,
  userTypeStep,
]);

export function setNextStep(
  step: ChatDecisionTreeNode,
  childIndex: number = 0
) {
  chatSteps.value = takeUntil(chatSteps.value, (s) => s.id === step.id).concat(
    step.children[childIndex] ?? { ...notImplementedYetStepTemplate }
  );
}
