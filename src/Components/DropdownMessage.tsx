import { useState } from "react";
import { BotMessage, UserMessage } from "./ChatMessage";
import { ConfirmButton } from "./ConfirmButton";

type DropdownMessageProps = {
  text: string;
  options: string[];
  onConfirmClicked: (selection: string) => void;
};

export function DropdownMessage({
  options,
  text,
  onConfirmClicked,
}: DropdownMessageProps) {
  const [isAfterConfirmState, setIsAfterConfirmState] = useState(false);
  const [selection, setSelection] = useState("");

  return (
    <>
      <div>
        <BotMessage>
          <div className="text-slate-800 dark:text-white text-start">
            {text}
          </div>
          {!isAfterConfirmState && (
            <select
              className="dropdown border rounded-md p-2 mt-2 whitespace-nowrap overflow-hidden text-ellipsis"
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
            >
              <option value="" disabled>
                בחר אפשרות
              </option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </BotMessage>
        {!isAfterConfirmState && selection && (
          <ConfirmButton
            position="end"
            disabled={!selection}
            onDoneButtonClicked={() => {
              setIsAfterConfirmState(true);
              onConfirmClicked(selection);
            }}
          />
        )}
      </div>
      {isAfterConfirmState && <UserMessage children={selection} />}
    </>
  );
}
