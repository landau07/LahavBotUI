import { useRef, useState } from "react";
import { BotMessage, UserMessage } from "./ChatMessage";

type DropdownMessageProps = {
  text: string;
  options: string[];
  onDoneButtonClicked?: (boxText: string) => void;
};

export function DropdownMessage({
  onDoneButtonClicked,
  options,
  text,
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
            onDoneButtonClicked={() => {
              setIsAfterConfirmState(true);
              onDoneButtonClicked?.("");
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

function ConfirmButton({
  onDoneButtonClicked,
}: {
  onDoneButtonClicked: () => void;
}) {
  return (
    <div className="flex flex-row-reverse me-14">
      <button
        onClick={onDoneButtonClicked}
        className="text-white py-2 px-4 rounded-md bg-lahav hover:bg-fuchsia-900 active:bg-fuchsia-950"
      >
        {"אשר"}
      </button>
    </div>
  );
}
