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
  stepValueToLog?: string;
  shouldLocalizeData: boolean;
  parentStepData?: string;
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
      type: "confirmComponent";
      component: ComponentType<ConfirmComponentProps<TInnerComponentProps>>;
      defaultValue: string;
      componentProps?: Omit<
        TInnerComponentProps,
        "isAfterConfirmState" | "setData"
      >;
    }
);

export type DecisionTreeContextType = {
  chatSteps: ChatDecisionTreeNode[];
  setNextStep: (step: ChatDecisionTreeNode, childIndex?: number) => void;
};
