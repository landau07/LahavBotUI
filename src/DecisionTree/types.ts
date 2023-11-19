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
  stepResult?: {
    value: string;
    localized?: string;
  };
  shouldLocalizeData: boolean;
  shouldWaitForUserInputAfterStep?: boolean;
} & (
  | {
      type: "text";
      content: string | ReactNode | React.FC<ChatDecisionTreeNode>; // string is Message id for localization.
      divProps?: React.HTMLProps<HTMLDivElement>;
      preventAutoRenderBotChild?: boolean; // If true, will not render bot following bod message's child of this step.
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

export type SetNextStepOptions = {
  childIndex?: number;
};

export type DecisionTreeContextType = {
  chatSteps: ChatDecisionTreeNode[];
  setNextStep: (
    step: ChatDecisionTreeNode,
    options?: SetNextStepOptions
  ) => void;
  getStepResult: (
    stepId: number
  ) => ChatDecisionTreeNode["stepResult"] | undefined;
  pushNewStep: (...newStep: ChatDecisionTreeNode[]) => void;
  lastStep: ChatDecisionTreeNode;
};
