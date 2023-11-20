import { useEffect, useState } from "react";
import { Check, Info, X } from "react-feather";
import { FormattedMessage, useIntl } from "react-intl";
import {
  babiesWeightStep,
  bornWeekAndDayStep,
} from "../DecisionTree/StepsDefinitions";
import { useCurrentStep } from "../DecisionTree/useCurrentStep";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import useTimeout from "../hooks/useTimeout";
import { cn } from "../utils/classnames";
import { TypingMessageContent } from "./TypingMessageContent";

export function BreastMilkEligibilityResult() {
  const [isTyping, setIsTyping] = useState(true);
  useTimeout(() => setIsTyping(false), 1500);
  const intl = useIntl();
  const step = useCurrentStep();

  const { getStepResult, setNextStep, lastStep } = useDecisionTree();
  const weekAndDayString = getStepResult(bornWeekAndDayStep.id)?.value;
  const week: number = parseInt(weekAndDayString?.split(" + ")[0] ?? "-1");

  const babiesWeight = getStepResult(babiesWeightStep.id)!
    .value.split(" , ")
    .map((weightStr) => parseFloat(weightStr));

  const result =
    week < 32 || babiesWeight.some((w) => w <= 1.5) ? "Eligible" : "NotEligible";

  useEffect(() => {
    step.stepResult = {
      value: result,
      localized: result,
    };
    // We want to render next step with the updated stepResult
    if (lastStep === step && !isTyping) {
      setNextStep(step);
    }
  }, [intl, isTyping, lastStep, result, setNextStep, step]);

  if (isTyping) {
    return <TypingMessageContent />;
  }

  return (
    <>
      {isTyping && <TypingMessageContent />}
      <div className={cn("flex flex-col gap-3", isTyping && "hidden")}>
        <h3 className="text-xl underline ">
          <FormattedMessage id="breastMilkEligibility" />
        </h3>
        <div className="flex gap-2">
          {result === "Eligible" ? (
            <Check className="text-green-600" />
          ) : (
            <X className="text-red-600" />
          )}
          <FormattedMessage
            id="breastMilkEligibilityResult"
            values={{
              week,
              weight: babiesWeight.join(", "),
            }}
          />
        </div>
        {result === "NotEligible" && (
          <div className="flex gap-3 p-2 pe-4 mt-2 bg-sky-400 bg-opacity-20 rounded-lg">
            <Info className="text-blue-400 w-10" />
            <FormattedMessage id="contactUsForOnSpecialCircumstances" />
          </div>
        )}
      </div>
    </>
  );
}
