import { FormattedMessage, useIntl } from "react-intl";
import { ChatMessage } from "../Components/ChatMessage";
import { ConfirmComponentWrapper } from "../Components/ConfirmComponentWrapper";
import { SelectionBoxList } from "../Components/SelectionBoxList";
import { ChatDecisionTreeNode } from "../DecisionTree/types";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";

export function useStepRenderer() {
  const { setNextStep, chatSteps } = useDecisionTree();
  const intl = useIntl();

  function renderStep(step: ChatDecisionTreeNode, index: number) {
    switch (step.type) {
      case "text":
        if (typeof step.content === "string") {
          step.result = {
            value: step.content,
            localized: step.shouldLocalizeData
              ? intl.formatMessage({ id: step.content })
              : step.content,
          };
        }
        return (
          <ChatMessage
            sender={step.sender}
            children={
              typeof step.content === "string" && step.shouldLocalizeData ? (
                <FormattedMessage
                  id={step.content}
                  values={step.formattedMessageValues ?? { br: <br /> }}
                />
              ) : typeof step.content === "function" ? (
                step.content(step)
              ) : (
                step.content
              )
            }
            key={index}
            timestamp={step.timestamp}
            showNameAndAvatar={
              step.sender !== chatSteps[index - 1]?.sender ||
              chatSteps[index - 1]?.type === "confirmComponent"
            }
            {...step.divProps}
          />
        );
      case "selectionBox":
        return (
          <SelectionBoxList
            boxes={step.boxes}
            key={`${step.branchKey}_${index}`}
            onBoxClicked={(boxIndex: number) => {
              step.result = {
                value: step.boxes[boxIndex],
                localized: step.shouldLocalizeData
                  ? intl.formatMessage({ id: step.boxes[boxIndex] })
                  : step.boxes[boxIndex],
              };
              setNextStep(step, { childIndex: boxIndex });
            }}
            shouldLocalizeData={step.shouldLocalizeData}
          />
        );
      case "confirmComponent": {
        return (
          <ConfirmComponentWrapper
            key={`${step.branchKey}_${index}`}
            onConfirmButtonClicked={(data) => {
              step.result = {
                value: data,
                localized: step.shouldLocalizeData
                  ? intl.formatMessage({ id: data })
                  : data,
              };
              step.stepLogQuestion =
                step.stepLogQuestion ||
                (step.shouldLocalizeData
                  ? intl.formatMessage({
                      id: step.stepLogQuestion,
                    })
                  : step.stepLogQuestion);
              setNextStep(step);
            }}
            ContentComponent={step.component}
            componentProps={step.componentProps?.(step)}
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
