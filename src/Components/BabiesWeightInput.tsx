import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isDesktop } from "react-device-detect";
import { FormattedMessage } from "react-intl";
import { usePrevious } from "../hooks/usePrevious";
import {
  inputNumberClassNames,
  messageTextClassNames,
} from "../utils/sharedClassNames";
import { ConfirmComponentProps } from "./ConfirmComponentWrapper";

export type BabiesWeightInputProps = {
  numOfBabies: 1 | 2 | 3 | 4 | 5;
} & ConfirmComponentProps;

export function BabiesWeightInput({
  setData,
  isAfterConfirmState,
  numOfBabies,
  onEnterPressed,
}: BabiesWeightInputProps) {
  const [babiesWeight, setBabiesWeight] = useState<number[]>(
    Array(numOfBabies).fill(1000)
  );

  const weightSummaryString = babiesWeight.join(" , ");
  const previousWeightSummaryString = usePrevious(weightSummaryString);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (previousWeightSummaryString !== weightSummaryString) {
      if (babiesWeight.some((weight) => weight <= 0 || weight > 6000)) {
        setData("");
      } else {
        setData(weightSummaryString);
      }
    }
  }, [babiesWeight, previousWeightSummaryString, setData, weightSummaryString]);

  useEffect(() => {
    if (isDesktop) {
      firstInputRef.current?.focus();
    }
  }, []);

  return (
    <>
      <div className={messageTextClassNames}>
        <FormattedMessage
          id={
            numOfBabies === 1
              ? "whatIsTheWeightOfTheBaby"
              : "whatIsTheWeightOfTheBabies"
          }
        />
      </div>
      {!isAfterConfirmState && (
        <div className="mt-4 flex flex-col justify-center gap-4">
          {Array.from({ length: numOfBabies }).map((_, i) => (
            <div className="text-center items-center flex" key={i}>
              <label htmlFor={`baby-${i + 1}`}>
                <FormattedMessage id="baby" values={{ number: i + 1 }}>
                  {(text) => (
                    <>
                      {numOfBabies !== 1 && (
                        <span className="me-2">
                          {text}&nbsp;{i + 1}
                        </span>
                      )}
                    </>
                  )}
                </FormattedMessage>
              </label>
              <input
                className={inputNumberClassNames + " w-24"}
                ref={i === 0 ? firstInputRef : undefined}
                type="number"
                id={`baby-${i + 1}`}
                name={`baby-${i + 1}`}
                step={"100"}
                min={0}
                max={6000}
                value={babiesWeight[i] > -1 ? babiesWeight[i] : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    e.preventDefault();
                    onEnterPressed?.();
                  }
                }}
                onChange={(e) => {
                  const weightString = e.target.value;
                  const weight = parseInt(weightString);
                  if (weightString === "") {
                    setBabiesWeight((prev) =>
                      prev.map((w, index) => (index === i ? -1 : w))
                    );
                  } else if (!isNaN(weight) && weight >= 0 && weight <= 6000) {
                    setBabiesWeight((prev) =>
                      prev.map((w, index) => (index === i ? weight : w))
                    );
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
