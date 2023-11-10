import { enUS, he } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FormattedMessage } from "react-intl";
import { locale } from "../signals";
import { dateToString } from "../utils/dateUtils";
import { messageTextClassNames } from "../utils/sharedClassNames";
import { ConfirmComponentProps } from "./ConfirmComponentWrapper";

type DatePickerMessageProps = ConfirmComponentProps;

export function DatePickerMessage({
  setData,
  isAfterConfirmState,
}: DatePickerMessageProps) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const fnsLocale = locale.value === "he" ? he : enUS;
  const selectedDayString = dateToString(selectedDay!);

  return (
    <>
      <div className={messageTextClassNames}>
        <FormattedMessage id={"whatWasTheBirthDate"} />
      </div>
      {!isAfterConfirmState && (
        <DayPicker
          mode="single"
          required
          selected={selectedDay!}
          dir={document.dir}
          locale={fnsLocale}
          onSelect={(day) => {
            setSelectedDay(day);
            setData(dateToString(day!));
          }}
          style={{ margin: 6 }}
          toDate={new Date()}
          footer={
            <p className="flex flex-row-reverse mt-4 me-2">
              {selectedDayString}
            </p>
          }
          className="bg-slate-950 rounded-lg p-2 bg-opacity-50"
        />
      )}
    </>
  );
}
