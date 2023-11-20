import { differenceInDays } from "date-fns";
import { useEffect } from "react";
import { Check, Info, X } from "react-feather";
import { FormattedMessage, useIntl } from "react-intl";
import {
  babiesWeightStep,
  birthDateStep,
  bornWeekAndDayStep,
  releaseFromNICUDateStep,
} from "../DecisionTree/StepsDefinitions";
import { useCurrentStep } from "../DecisionTree/useCurrentStep";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import { stringToDate } from "../utils/dateUtils";

export function PrematureAllowanceResult() {
  const intl = useIntl();
  const step = useCurrentStep();

  const { getStepResult, setNextStep, lastStep } = useDecisionTree();
  const weekAndDayString = getStepResult(bornWeekAndDayStep.id)?.value;
  const week: number = parseInt(weekAndDayString?.split(" + ")[0] ?? "-1");

  const birthDate = stringToDate(getStepResult(birthDateStep.id)!.value)!;
  const releaseFromHospitalDate = stringToDate(
    getStepResult(releaseFromNICUDateStep.id)?.value
  );

  const numOfDaysBabyInHospital = differenceInDays(
    birthDate,
    releaseFromHospitalDate ?? new Date()
  );

  const babiesWeight = getStepResult(babiesWeightStep.id)!
    .value.split(" , ")
    .map((weightStr) => parseFloat(weightStr));

  const result =
    week < 33 ||
    numOfDaysBabyInHospital > 30 ||
    babiesWeight.some((w) => w <= 1.75)
      ? "Eligible"
      : "NotEligible";

  useEffect(() => {
    step.result = {
      value: result,
      localized: result,
    };
    // We want to render next step with the updated stepResult
    if (lastStep === step) {
      setNextStep(step, { childIndex: result === "Eligible" ? 0 : 1 });
    }
  }, [intl, lastStep, result, setNextStep, step]);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl underline ">
        <FormattedMessage id="prematurityAllowanceFromNationalInsurance" />
      </h3>
      <div className="flex gap-2">
        {result === "Eligible" ? (
          <>
            <Check className="text-green-600" />
            <FormattedMessage
              id="prematurityAllowanceResult"
              values={{
                week,
                weight: babiesWeight.join(", "),
                daysInHospital: numOfDaysBabyInHospital,
              }}
            />
          </>
        ) : (
          <>
            <X className="text-red-600" />
            <FormattedMessage id="prematurityAllowanceResultNotEntitled" />
          </>
        )}
      </div>
      {result === "Eligible" && (
        <div className="flex gap-3 p-2 pe-4 mt-2 bg-sky-400 bg-opacity-20 rounded-lg">
          <Info className="text-blue-400 w-10" />
          <FormattedMessage
            id="prematurityAllowanceResultEntitled"
            values={{
              numMonths: numOfDaysBabyInHospital >= 45 ? 9 : 6,
              fromMonth: 3,
              toMonth: numOfDaysBabyInHospital >= 45 ? 9 : 6,
            }}
          />
        </div>
      )}
    </div>
  );
}
