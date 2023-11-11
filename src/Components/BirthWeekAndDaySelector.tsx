import { useLayoutEffect, useState } from "react";
import { Plus } from "react-feather";
import { FormattedMessage } from "react-intl";
import { usePrevious } from "../hooks/usePrevious";
import { inputNumberClassNames, messageTextClassNames } from "../utils/sharedClassNames";
import { ConfirmComponentProps } from "./ConfirmComponentWrapper";

type BirthWeekAndDaySelectorProps = ConfirmComponentProps;

export function BirthWeekAndDaySelector({
  setData,
  isAfterConfirmState,
}: BirthWeekAndDaySelectorProps) {
  const MIN_WEEK = 20;
  const MAX_WEEK = 42;
  const MIN_DAY = 0;
  const MAX_DAY = 6;

  const [selectedWeek, setSelectedWeek] = useState(30);
  const [selectedDay, setSelectedDay] = useState(0);

  const weekAndDayString = `${selectedWeek} + ${selectedDay}`;
  const previousWeekAndDateString = usePrevious(weekAndDayString);

  useLayoutEffect(() => {
    if (previousWeekAndDateString !== weekAndDayString) {
      if (selectedWeek < MIN_WEEK || selectedWeek > MAX_WEEK) {
        setData("");
      } else {
        setData(weekAndDayString);
      }
    }
  }, [previousWeekAndDateString, selectedWeek, setData, weekAndDayString]);

  return (
    <>
      <div className={messageTextClassNames}>
        <FormattedMessage id={"whatWasTheBirthWeekAndDay"} />
      </div>
      {!isAfterConfirmState && (
        <div className="mt-4 flex justify-center gap-4">
          <div className="text-center">
            <label htmlFor="week">
              <FormattedMessage id={"week"} />
            </label>
            <br />
            <input
              className={inputNumberClassNames}
              type="number"
              id="week"
              name="week"
              min={MIN_WEEK}
              max={MAX_WEEK}
              value={selectedWeek}
              onChange={(e) => {
                const week = e.target.valueAsNumber;
                if (!isNaN(week)) {
                  setSelectedWeek(week);
                }
              }}
            />
          </div>
          <Plus className="mt-8"/>
          <div className="text-center">
            <label htmlFor="day">
              <FormattedMessage id={"day"} />
            </label>
            <br />
            <input
              className={inputNumberClassNames}
              type="number"
              id="day"
              name="day"
              min={`${MIN_DAY}`}
              max={`${MAX_DAY}`}
              value={selectedDay}
              onChange={(e) => {
                const day = e.target.valueAsNumber;
                if (!isNaN(day) && day >= MIN_DAY && day <= MAX_DAY) {
                  setSelectedDay(day);
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
