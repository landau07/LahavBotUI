import { format } from "date-fns";
import { enUS, he } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { locale } from "../signals";
import { ChatMessage } from "./ChatMessage";
import { ConfirmButton } from "./ConfirmButton";

type DatePickerMessageProps = {
  onDatePicked: (date: Date) => void;
};

export function DatePickerMessage({ onDatePicked }: DatePickerMessageProps) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const fnsLocale = locale.value === "he" ? he : enUS;

  return (
    <div>
      <ChatMessage sender="user">
        <DayPicker
          mode="single"
          required
          selected={selectedDay}
          dir={document.dir}
          locale={fnsLocale}
          onSelect={setSelectedDay}
          style={{ margin: 6 }}
          toDate={new Date()}
          footer={
            selectedDay && (
              <p className="flex flex-row-reverse mt-4 me-2">
                {format(selectedDay, "PPP", { locale: fnsLocale })}
              </p>
            )
          }
          className="bg-slate-950 rounded-lg p-2 bg-opacity-50"
        />
      </ChatMessage>
      <ConfirmButton
        position="start"
        disabled={!selectedDay}
        onClick={() => {
          onDatePicked(selectedDay!);
        }}
      />
    </div>
  );
}
