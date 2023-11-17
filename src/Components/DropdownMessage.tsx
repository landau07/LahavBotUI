import { useLayoutEffect, useState } from "react";
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
      <div className={messageTextClassNames}>
        <FormattedMessage id={text} />
      </div>
      {!isAfterConfirmState && (
        <Select
          classNamePrefix="my-react-select"
          className="p2 mt-2 my-react-select-container"
          options={selectOptions}
          isSearchable
          autoFocus
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
