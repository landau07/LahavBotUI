import { ChatDecisionTreeNode, chatSteps } from "../ChatDecisionTree";
import { ChatMessage } from "../Components/ChatMessage";
import { DropdownMessage } from "../Components/DropdownMessage";
import { SelectionBoxList } from "../Components/SelectionBoxList";
import { takeUntil } from "./arrayUtils";

export function renderStep(step: ChatDecisionTreeNode, index: number) {
  switch (step.type) {
    case "text":
      return (
        <ChatMessage sender={step.sender} children={step.text} key={index} />
      );
    case "dropdown":
      return (
        <DropdownMessage
          text={step.text}
          options={step.options}
          key={index}
          onConfirmClicked={() =>
            (chatSteps.value = takeUntil(
              chatSteps.value,
              (s) => s.id === step.id
            ).concat(step.children[0]))
          }
        />
      );
    case "selectionBox":
      return (
        <SelectionBoxList
          boxes={step.boxes}
          key={index}
          onBoxClicked={(boxIndex: number) =>
            (chatSteps.value = takeUntil(
              chatSteps.value,
              (s) => s.id === step.id
            ).concat(step.children[boxIndex]))
          }
        />
      );
    default:
      throw new Error("Unknown step type");
  }
}
