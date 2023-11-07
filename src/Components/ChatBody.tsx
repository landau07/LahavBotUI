import { chatSteps } from "../ChatDecisionTree";
import { renderStep } from "../utils/StepRendererUtil";

export function ChatBody() {
  const steps = chatSteps.value;
  let curStep = steps[steps.length - 1];

  // Add all the bot's text steps that does't require user input
  while (
    curStep.sender === "bot" &&
    curStep.type === "text" &&
    curStep.children[0]
  ) {
    curStep = curStep.children[0];
    steps.push(curStep);
  }

  return (
    <div className="flex flex-col flex-1 min-h-[200px] overflow-y-auto p-4 bg-slate-100 gap-3">
      {steps.map((step, index) => renderStep(step, index))}
    </div>
  );
}
