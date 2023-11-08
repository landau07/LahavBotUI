import { format } from "date-fns";
import { ChatDecisionTreeNode, setNextStep } from "../ChatDecisionTree";
import { ChatMessage } from "../Components/ChatMessage";
import { DatePickerMessage } from "../Components/DatePickerMessage";
import { DropdownMessage } from "../Components/DropdownMessage";
import { SelectionBoxList } from "../Components/SelectionBoxList";

export function renderStep(step: ChatDecisionTreeNode, index: number) {
  switch (step.type) {
    case "text":
      if (typeof step.content === "string") {
        step.stepValueToLog = step.content;
      }
      return (
        <ChatMessage
          sender={step.sender}
          children={step.content}
          key={index}
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
            step.stepValueToLog = selection;
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
            step.stepValueToLog = step.boxes[boxIndex];
          }}
        />
      );
    case "date":
      return (
        <DatePickerMessage
          key={`${step.branchKey}_${index}`}
          onDatePicked={(date) => {
            setNextStep(step);
            step.stepValueToLog = format(date, "dd/MM/yyyy");
          }}
        />
      );
    default:
      throw new Error("Unknown step type");
  }
}
