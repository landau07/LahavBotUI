import { chatSteps } from "../signals";

export function sendRequestTicket() {
  const stepDetails = chatSteps.value.map((step) => step.stepValueToLog ?? "");

  console.log(stepDetails.join("\n\n"));
}
