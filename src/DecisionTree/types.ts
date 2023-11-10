import { ReactNode } from "react";
import { ConfirmComponentProps } from "../Components/ConfirmComponentWrapper";

export type ChatDecisionTreeNode = {
  id: number;
  parent: ChatDecisionTreeNode | null;
  timestamp?: Date;
  children: (ChatDecisionTreeNode | null)[];
  branchKey: number; // used to avoid storing state when going back in the flow
  sender: "user" | "bot";
  stepValueToLog?: string;
} & (
  | {
      type: "text";
      content: string | ReactNode; // string is Message id for localization.
      divProps?: React.HTMLProps<HTMLDivElement>;
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
  | {
      type: "confirmComponent";
      component: ({ setData }: ConfirmComponentProps) => JSX.Element;
      defaultValue: string;
      shouldLocalizeData: boolean;
    }
);

export type DecisionTreeContextType = {
  chatSteps: ChatDecisionTreeNode[];
  setNextStep: (step: ChatDecisionTreeNode, childIndex?: number) => void;
};
