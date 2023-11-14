import { ComponentType, ReactNode } from "react";
import { ConfirmComponentProps } from "../Components/ConfirmComponentWrapper";

export type ChatDecisionTreeNode<TInnerComponentProps = unknown> = {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: ChatDecisionTreeNode<any> | null;
  timestamp?: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (ChatDecisionTreeNode<any> | null)[];
  branchKey: number; // used to avoid storing state when going back in the flow
  sender: "user" | "bot";
  stepResult?: string;
  shouldLocalizeData: boolean;
  parentStepData?: string;
} & (
  | {
      type: "text";
      content: string | ReactNode | React.FC<ChatDecisionTreeNode>; // string is Message id for localization.
      divProps?: React.HTMLProps<HTMLDivElement>;
    }
  | {
      type: "selectionBox";
      sender: "user";
      boxes: string[];
    }
  | {
      type: "confirmComponent";
      stepLogQuestion: string;
      sender: "bot";
      component: ComponentType<ConfirmComponentProps<TInnerComponentProps>>;
      defaultValue: string;
      componentProps?: (
        step: ChatDecisionTreeNode
      ) => Omit<TInnerComponentProps, keyof ConfirmComponentProps>;
    }
);

export type DecisionTreeContextType = {
  chatSteps: ChatDecisionTreeNode[];
  setNextStep: (step: ChatDecisionTreeNode, childIndex?: number) => void;
};
