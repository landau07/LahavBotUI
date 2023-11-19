import { addMonths, set } from "date-fns";
import { useEffect, useState } from "react";
import { Check, X } from "react-feather";
import { FormattedMessage, useIntl } from "react-intl";
import {
  babiesWeightStep,
  birthDateStep,
  bornWeekAndDayStep,
} from "../DecisionTree/StepsDefinitions";
import { useCurrentStep } from "../DecisionTree/useCurrentStep";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import useTimeout from "../hooks/useTimeout";
import { cn } from "../utils/classnames";
import {
  calculateAgeAtDate,
  formatAge,
  stringToDate,
} from "../utils/dateUtils";
import { TypingMessageContent } from "./TypingMessageContent";

export function RsvCalculationResult() {
  const [isTyping, setIsTyping] = useState(true);
  useTimeout(() => setIsTyping(false), 1500);
  const intl = useIntl();
  const step = useCurrentStep();

  const { getStepResult, setNextStep, lastStep } = useDecisionTree();
  const weekAndDayString = getStepResult(bornWeekAndDayStep.id)?.value;
  const week: number = parseInt(weekAndDayString?.split(" + ")[0] ?? "-1");

  const birthDate = stringToDate(getStepResult(birthDateStep.id)!.value);
  const ageInNovember = calculateAgeAtDate(birthDate, getNextNovemberFirst());

  const babiesWeight = getStepResult(babiesWeightStep.id)!
    .value.split(" , ")
    .map((weightStr) => parseFloat(weightStr));

  const reason = eligibilityReasonForRsv(week, ageInNovember, babiesWeight);

  useEffect(() => {
    step.stepResult = {
      value: reason.startsWith("notEntitledForRsvMessage")
        ? "NotEligible"
        : "Eligible",
      localized: intl.formatMessage({ id: reason }),
    };
    // We want to render next step with the updated stepResult
    if (lastStep === step && !isTyping) {
      setNextStep(step);
    }
  }, [intl, isTyping, lastStep, reason, setNextStep, step]);

  if (isTyping) {
    return <TypingMessageContent />;
  }
  const msg = intl.formatMessage(
    {
      id: reason,
    },
    {
      week: `${week}`,
      weight: babiesWeight.filter((w) => w < 1).join(", "),
      age: formatAge(ageInNovember.years, ageInNovember.months, intl),
    }
  );
  return (
    <>
      {isTyping && <TypingMessageContent />}
      <div className={cn("flex flex-col gap-3", isTyping && "hidden")}>
        <h3 className="text-xl underline ">
          <FormattedMessage id="eligibilityForRsvVaccine" />
        </h3>
        <div className="flex gap-2">
          {reason.startsWith("notEntitledForRsvMessage") ? (
            <X className="text-red-600" />
          ) : (
            <Check className="text-green-600" />
          )}
          {msg}
        </div>
      </div>
    </>
  );
}

const eligibilityReasonForRsv = (
  week: number,
  ageInNovember: { years: number; months: number },
  weights: number[]
) => {
  const isBornBeforeWeek33 = week < 33;
  const isAboveAge1AtNovember =
    ageInNovember.years > 1 ||
    (ageInNovember.years === 1 && ageInNovember.months >= 0);

  if (weights.some((w) => w < 1) && !isAboveAge1AtNovember) {
    return weights.length === 1
      ? "entitledForRsvDueToWeight"
      : "entitledForRsvDueToWeightPlural";
  }

  if (isBornBeforeWeek33 && !isAboveAge1AtNovember) {
    return weights.length === 1
      ? "entitledForRsvDueToWeek33"
      : "entitledForRsvDueToWeek33Plural";
  }

  const isBornBeforeWeek35 = week < 35;
  const isAbove6MonthsAtNovember =
    ageInNovember.years > 0 || ageInNovember.months >= 6;

  if (isBornBeforeWeek35 && !isAbove6MonthsAtNovember) {
    return weights.length === 1
      ? "entitledForRsvDueToWeek35"
      : "entitledForRsvDueToWeek35Plural";
  }

  return weights.length === 1
    ? "notEntitledForRsvMessage"
    : "notEntitledForRsvMessagePlural";
};

const getNextNovemberFirst = () => {
  const currentDate = new Date(); // or your desired starting date

  // Set the current date to the next November
  const nextNovember = set(currentDate, { month: 10, date: 1 });

  // If the current date is already in or after November, add a year
  return addMonths(nextNovember, currentDate.getMonth() >= 10 ? 12 : 0);
};
