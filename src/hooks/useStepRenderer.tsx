import { FormattedMessage, useIntl } from "react-intl";
import { ChatMessage } from "../Components/ChatMessage";
import { ConfirmComponentWrapper } from "../Components/ConfirmComponentWrapper";
import { DropdownMessage } from "../Components/DropdownMessage";
import { SelectionBoxList } from "../Components/SelectionBoxList";
import { ChatDecisionTreeNode } from "../DecisionTree/types";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";

export function useStepRenderer() {
  const { setNextStep } = useDecisionTree();
  const intl = useIntl();

  function renderStep(step: ChatDecisionTreeNode, index: number) {
    switch (step.type) {
      case "text":
        if (typeof step.content === "string") {
          step.stepValueToLog =
            step.sender === "user"
              ? step.content
              : intl.formatMessage({ id: step.content });
        }
        return (
          <ChatMessage
            sender={step.sender}
            children={
              typeof step.content === "string" ? (
                <FormattedMessage id={step.content} />
              ) : (
                step.content
              )
            }
            key={index}
            timestamp={step.timestamp}
            showNameAndAvatar={step.sender !== step.parent?.sender}
            {...step.divProps}
          />
        );
      case "dropdown":
        return (
          <DropdownMessage
            text={step.text}
            options={step.options}
            key={`${step.branchKey}_${index}`}
            onConfirmClicked={(selection) => {
              setNextStep(step);
              step.stepValueToLog = intl.formatMessage({ id: selection });
            }}
          />
        );
      case "selectionBox":
        return (
          <SelectionBoxList
            boxes={step.boxes}
            key={`${step.branchKey}_${index}`}
            onBoxClicked={(boxIndex: number) => {
              setNextStep(step, boxIndex);
              step.stepValueToLog = intl.formatMessage({
                id: step.boxes[boxIndex],
              });
            }}
          />
        );
      case "confirmComponent": {
        return (
          <ConfirmComponentWrapper
            key={`${step.branchKey}_${index}`}
            onConfirmButtonClicked={(data) => {
              setNextStep(step);
              step.stepValueToLog = data;
            }}
            ContentComponent={step.component}
            defaultValue={step.defaultValue}
            shouldLocalizeData={step.shouldLocalizeData}
          />
        );
      }
      default:
        throw new Error("Unknown step type");
    }
  }

  return { renderStep };
}
