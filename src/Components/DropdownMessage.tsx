import { useRef, useState } from "react";
import { BotMessage, UserMessage } from "./ChatMessage";
import { ConfirmButton } from "./ConfirmButton";

type DropdownMessageProps = {
  text: string;
  options: string[];
  onConfirmClicked: () => void;
};

export function DropdownMessage({
  options,
  text,
  onConfirmClicked,
}: DropdownMessageProps) {
  const [isAfterConfirmState, setIsAfterConfirmState] = useState(false);
  const selectionRef = useRef<HTMLSelectElement>(null);

  return (
    <>
      <div>
        <BotMessage>
          <div className="text-slate-800 text-start">{text}</div>
          {!isAfterConfirmState && (
            <select
              ref={selectionRef}
              className="dropdown border rounded-md p-2 mt-2 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <option value="" disabled>
                Select an option
              </option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </BotMessage>
        {!isAfterConfirmState && (
          <ConfirmButton
            position="end"
            onDoneButtonClicked={() => {
              setIsAfterConfirmState(true);
              onConfirmClicked();
            }}
          />
        )}
      </div>
      {isAfterConfirmState && (
        <UserMessage children={selectionRef.current?.value} />
      )}
    </>
  );
}
