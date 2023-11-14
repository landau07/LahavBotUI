import { enUS, he } from "date-fns/locale";
import { useLayoutEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FormattedMessage } from "react-intl";
import { usePrevious } from "../hooks/usePrevious";
import { isDarkMode, locale } from "../signals";
import { cn } from "../utils/classnames";
import { dateToString } from "../utils/dateUtils";
import { messageTextClassNames } from "../utils/sharedClassNames";
import { ConfirmComponentProps } from "./ConfirmComponentWrapper";

export type DatePickerMessageProps = { textId: string } & ConfirmComponentProps;

export function DatePickerMessage({
  setData,
  textId,
  isAfterConfirmState,
}: DatePickerMessageProps) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const fnsLocale = locale.value === "he" ? he : enUS;
  const selectedDayString = dateToString(selectedDay!);

  const previousDateString = usePrevious(selectedDayString);

  useLayoutEffect(() => {
    if (previousDateString !== selectedDayString) {
      setData(selectedDayString);
    }
  }, [previousDateString, selectedDayString, setData]);

  return (
    <>
      <div className={messageTextClassNames}>
        <FormattedMessage id={textId} />
      </div>
      {!isAfterConfirmState && (
        <div className="mt-4">
          <DayPicker
            initialFocus
            mode="single"
            required
            selected={selectedDay!}
            dir={document.dir}
            locale={fnsLocale}
            onSelect={(day) => setSelectedDay(day)}
            style={{ margin: 6 }}
            toDate={new Date()}
            footer={
              <p className="flex flex-row-reverse mt-4 me-2">
                {selectedDayString}
              </p>
            }
            className={cn(
              `bg-slate-950 rounded-lg p-2`,
              isDarkMode.value ? "bg-opacity-50" : "bg-opacity-10"
            )}
          />
        </div>
      )}
    </>
  );
}
