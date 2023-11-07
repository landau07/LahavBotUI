import { format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { UserMessage } from "./ChatMessage";
import { ConfirmButton } from "./ConfirmButton";

type DatePickerMessageProps = {
  onDatePicked: () => void;
};

export function DatePickerMessage({ onDatePicked }: DatePickerMessageProps) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);

  return (
    <div>
      <UserMessage>
        <DayPicker
          mode="single"
          required
          selected={selectedDay}
          dir={document.dir}
          lang="he"
          onSelect={setSelectedDay}
          footer={
            selectedDay && (
              <p className="flex flex-row-reverse mt-4 me-2">
                {format(selectedDay, "PPP")}
              </p>
            )
          }
          className="bg-slate-950 rounded-lg p-2 bg-opacity-50"
        />
      </UserMessage>
      <ConfirmButton
        position="start"
        disabled={!selectedDay}
        onDoneButtonClicked={() => {
          onDatePicked();
        }}
      />
    </div>
  );
}
