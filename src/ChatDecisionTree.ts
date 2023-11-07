import { signal } from "@preact/signals-react";

export type ChatDecisionTreeNode = {
  id: number;
  parent: ChatDecisionTreeNode | null;
  children: ChatDecisionTreeNode[];
  sender: "user" | "bot";
} & (
  | {
      type: "text";
      text: string;
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
);

export const welcomeStep: ChatDecisionTreeNode = {
  id: 0,
  parent: null,
  children: [],
  sender: "bot",
  type: "text",
  text: "היי! הגעתם לבוט של לה״ב. נשמח לסייע ולהפנות אותך לאן שאתה צריך. האם אתה:",
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
  text: "האם התינוק עדין בפגיה?",
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
  text: "מה תאריך הלידה?",
};

const notImplementedYetStepTemplate: ChatDecisionTreeNode = {
  id: -1,
  parent: userTypeStep,
  children: [],
  sender: "bot",
  type: "text",
  text: "סורי, עוד לא מימשנו את הנתיב הזה...",
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

export const chatSteps = signal<ChatDecisionTreeNode[]>([
  welcomeStep,
  userTypeStep,
]);
