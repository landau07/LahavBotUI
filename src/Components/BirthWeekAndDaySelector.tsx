import { useState } from "react";
import { Plus } from "react-feather";
import { FormattedMessage } from "react-intl";
import { messageTextClassNames } from "../utils/sharedClassNames";
import { ConfirmComponentProps } from "./ConfirmComponentWrapper";

type BirthWeekAndDaySelectorProps = ConfirmComponentProps;

export function BirthWeekAndDaySelector({
  setData,
  isAfterConfirmState,
}: BirthWeekAndDaySelectorProps) {
  const [selectedWeek, setSelectedWeek] = useState(30);
  const [selectedDay, setSelectedDay] = useState(0);

  const inputNumberClassNames =
    "w-16 border border-slate-900 bg-[#28323770] rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500";

  return (
    <>
      <div className={messageTextClassNames}>
        <FormattedMessage id={"whatWasTheBirthWeekAndDay"} />
      </div>
      {!isAfterConfirmState && (
        <div className="flex justify-center items-center gap-4">
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
              min="20"
              max="42"
              value={selectedWeek}
              onChange={(e) => {
                setSelectedWeek(parseInt(e.target.value));
                setData(
                  document.dir === "ltr"
                    ? `${e.target.value} + ${selectedDay}`
                    : `${selectedDay} + ${e.target.value}`
                );
              }}
            />
          </div>
          <Plus />
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
              min="0"
              max="6"
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(parseInt(e.target.value));
                setData(
                  document.dir === "ltr"
                    ? `${selectedWeek} + ${e.target.value}`
                    : `${e.target.value} + ${selectedWeek}`
                );
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
