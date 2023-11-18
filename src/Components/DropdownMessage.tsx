import { useLayoutEffect, useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
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
  const intl = useIntl();
  const selectOptions = options.map((value) => ({
    label: intl.formatMessage({ id: value }),
    value,
  }));
  selectOptions.sort((a, b) => a.label.localeCompare(b.label));
  const [selection, setSelection] = useState(selectOptions[0].value);
  const previousSelection = usePrevious(selection);

  useLayoutEffect(() => {
    if (previousSelection !== selection) {
      setData(selection);
    }
  }, [previousSelection, selection, setData]);

  return (
    <>
      <label
        htmlFor="dropdown-message-select"
        className={messageTextClassNames}
      >
        <FormattedMessage id={text} />
      </label>
      {!isAfterConfirmState && (
        <Select
          id="dropdown-message-select"
          classNamePrefix="my-react-select"
          aria-label="Choose hospital"
          className="p2 mt-2 w-56 my-react-select-container"
          options={selectOptions}
          isSearchable
          autoFocus={isDesktop}
          menuPlacement={isMobile ? "top" : "bottom"}
          value={{
            value: selection,
            label: intl.formatMessage({ id: selection }),
          }}
          onChange={(option) => setSelection(option?.value || "")}
          isRtl={document.dir === "rtl"}
        />
      )}
    </>
  );
}
