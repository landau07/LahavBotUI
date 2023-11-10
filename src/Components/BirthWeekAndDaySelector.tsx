import { useState } from "react";
import { Plus } from "react-feather";
import { useIntl } from "react-intl";
import { ConfirmButton } from "./ConfirmButton";

export function BirthWeekAndDaySelector() {
  const [selectedWeek, setSelectedWeek] = useState(30);
  const [selectedDay, setSelectedDay] = useState(0);
  const intl = useIntl();

  const inputNumberClassNames =
    "w-16 border border-slate-900 bg-[#28323770] rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500";

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <div className="text-center">
          <label htmlFor="week">{intl.formatMessage({ id: "week" })}</label>
          <br />
          <input
            className={inputNumberClassNames}
            type="number"
            id="week"
            name="week"
            min="20"
            max="42"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
          />
        </div>
        <Plus />
        <div className="text-center">
          <label htmlFor="day">{intl.formatMessage({ id: "day" })}</label>
          <br />
          <input
            className={inputNumberClassNames}
            type="number"
            id="day"
            name="day"
            min="0"
            max="6"
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value))}
          />
        </div>
      </div>
      <ConfirmButton position="end" onDoneButtonClicked={() => {}} />
    </>
  );
}
