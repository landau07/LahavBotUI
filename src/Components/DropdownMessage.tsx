import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ChatMessage } from "./ChatMessage";
import { ConfirmButton } from "./ConfirmButton";
import { messageTextClassNames } from "../utils/sharedClassNames";

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
  const [selection, setSelection] = useState(options[0]);

  return (
    <>
      <div>
        <ChatMessage sender="bot">
          <div className={messageTextClassNames}>
            <FormattedMessage id={text} />
          </div>
          {!isAfterConfirmState && (
            <select
              className="dropdown border rounded-md p-2 mt-2 whitespace-nowrap overflow-hidden text-ellipsis"
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
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
        </ChatMessage>
        {!isAfterConfirmState && selection && (
          <ConfirmButton
            position="end"
            disabled={!selection}
            onClick={() => {
              setIsAfterConfirmState(true);
              onConfirmClicked(selection);
            }}
          />
        )}
      </div>
      {isAfterConfirmState && (
        <ChatMessage
          sender="user"
          children={<FormattedMessage id={selection} />}
        />
      )}
    </>
  );
}
