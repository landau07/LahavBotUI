import { useLayoutEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { usePrevious } from "../hooks/usePrevious";
import { messageTextClassNames } from "../utils/sharedClassNames";
import { ConfirmComponentProps } from "./ConfirmComponentWrapper";

export type DropdownMessageProps = {
  text: string;
  options: string[]; // Text ids for localization
} & ConfirmComponentProps;

export function DropdownMessage({
  options,
  text,
  isAfterConfirmState,
  setData,
}: DropdownMessageProps) {
  const [selection, setSelection] = useState(options[0]);
  const previousSelection = usePrevious(selection);

  useLayoutEffect(() => {
    if (previousSelection !== selection) {
      setData(selection);
    }
  }, [previousSelection, selection, setData]);

  return (
    <>
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
    </>
  );
}
