import { ChatDecisionTreeNode, setNextStep } from "../ChatDecisionTree";
import { ChatMessage } from "../Components/ChatMessage";
import { DatePickerMessage } from "../Components/DatePickerMessage";
import { DropdownMessage } from "../Components/DropdownMessage";
import { SelectionBoxList } from "../Components/SelectionBoxList";

export function renderStep(step: ChatDecisionTreeNode, index: number) {
  switch (step.type) {
    case "text":
      return (
        <ChatMessage sender={step.sender} children={step.content} key={index} />
      );
    case "dropdown":
      return (
        <DropdownMessage
          text={step.text}
          options={step.options}
          key={index}
          onConfirmClicked={() => setNextStep(step)}
        />
      );
    case "selectionBox":
      return (
        <SelectionBoxList
          boxes={step.boxes}
          key={index}
          onBoxClicked={(boxIndex: number) => setNextStep(step, boxIndex)}
        />
      );
    case "date":
      return (
        <DatePickerMessage key={index} onDatePicked={() => setNextStep(step)} />
      );
    default:
      throw new Error("Unknown step type");
  }
}
