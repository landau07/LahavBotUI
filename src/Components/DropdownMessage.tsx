import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { BotMessage, UserMessage } from "./ChatMessage";
import { ConfirmButton } from "./ConfirmButton";

type DropdownMessageProps = {
  text: string;
  options: string[]; // Text ids for localization
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
            <FormattedMessage id={text} />
          </div>
          {!isAfterConfirmState && (
            <select
              className="dropdown border rounded-md p-2 mt-2 whitespace-nowrap overflow-hidden text-ellipsis"
              value={selection}
              onChange={(e) =>
                setSelection(
                  e.target.selectedOptions[0].innerText || e.target.value
                )
              }
            >
              <option value="" disabled>
                <FormattedMessage id="selectOption" />
              </option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  <FormattedMessage id={option} />
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
