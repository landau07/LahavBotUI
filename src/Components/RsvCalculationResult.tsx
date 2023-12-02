import { addYears, set } from "date-fns";
import { useEffect } from "react";
import { Check, X } from "react-feather";
import { FormattedMessage, useIntl } from "react-intl";
import {
  babiesWeightStep,
  birthDateStep,
  bornWeekAndDayStep,
} from "../DecisionTree/StepsDefinitions";
import { useCurrentStep } from "../DecisionTree/useCurrentStep";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import {
  calculateAgeAtDate,
  formatAge,
  stringToDate,
} from "../utils/dateUtils";

export function RsvCalculationResult() {
  const intl = useIntl();
  const step = useCurrentStep();

  const { getStepResult, setNextStep, lastStep } = useDecisionTree();
  const weekAndDayString = getStepResult(bornWeekAndDayStep.id)?.value;
  const week: number = parseInt(weekAndDayString?.split(" + ")[0] ?? "-1");

  const birthDate = stringToDate(getStepResult(birthDateStep.id)!.value)!;
  const { novemberDate, isNextYearNovember } = getNovemberFirst();
  const ageInNovember = calculateAgeAtDate(birthDate, novemberDate);

  const babiesWeight = getStepResult(babiesWeightStep.id)!
    .value.split(" , ")
    .map((weightStr) => parseFloat(weightStr));

  const reason = eligibilityReasonForRsv(
    week,
    ageInNovember,
    babiesWeight,
    isNextYearNovember
  );

  useEffect(() => {
    step.result = {
      value: reason.startsWith("notEntitledForRsvMessage")
        ? "NotEligible"
        : "Eligible",
      localized: intl.formatMessage({ id: reason }),
    };
    // We want to render next step with the updated stepResult
    if (lastStep === step) {
      setNextStep(step);
    }
  }, [intl, lastStep, reason, setNextStep, step]);

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
      <div className="flex flex-col gap-3">
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
  weights: number[],
  isNextYearNovember: boolean
) => {
  const isBornBeforeWeek33 = week < 33;
  const isAboveAge1AtNovember =
    ageInNovember.years > 1 ||
    (ageInNovember.years === 1 && ageInNovember.months >= 0);

  if (weights.some((w) => w < 1) && !isAboveAge1AtNovember) {
    return weights.length === 1
      ? isNextYearNovember
        ? "entitledForRsvDueToWeight"
        : "entitledForRsvDueToWeightLastNov"
      : isNextYearNovember
      ? "entitledForRsvDueToWeightPlural"
      : "entitledForRsvDueToWeightPluralLastNov";
  }

  if (isBornBeforeWeek33 && !isAboveAge1AtNovember) {
    return weights.length === 1
      ? isNextYearNovember
        ? "entitledForRsvDueToWeek33"
        : "entitledForRsvDueToWeek33LastNov"
      : isNextYearNovember
      ? "entitledForRsvDueToWeek33Plural"
      : "entitledForRsvDueToWeek33PluralLastNov";
  }

  const isBornBeforeWeek35 = week < 35;
  const isAbove6MonthsAtNovember =
    ageInNovember.years > 0 || ageInNovember.months >= 6;

  if (isBornBeforeWeek35 && !isAbove6MonthsAtNovember) {
    return weights.length === 1
      ? isNextYearNovember
        ? "entitledForRsvDueToWeek35"
        : "entitledForRsvDueToWeek35LastNov"
      : isNextYearNovember
      ? "entitledForRsvDueToWeek35Plural"
      : "entitledForRsvDueToWeek35PluralLastNov";
  }

  return weights.length === 1
    ? isNextYearNovember
      ? "notEntitledForRsvMessage"
      : "notEntitledForRsvMessageLastNov"
    : isNextYearNovember
    ? "notEntitledForRsvMessagePlural"
    : "notEntitledForRsvMessagePluralLastNov";
};

const getNovemberFirst = () => {
  const currentDate = new Date();

  // Set the current date to the next November
  const november = set(currentDate, { month: 10, date: 1 });

  // If the current date is between November to Match -> use last November
  // Else use next year November
  const isBetweenMarchToNovember =
    currentDate.getMonth() >= 10 || currentDate.getMonth() <= 2;

  if (!isBetweenMarchToNovember) {
    addYears(november, 1);
  }

  return {
    isNextYearNovember: !isBetweenMarchToNovember,
    novemberDate: november,
  };
};
