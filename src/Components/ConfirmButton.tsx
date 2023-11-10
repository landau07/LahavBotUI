import { ButtonHTMLAttributes } from "react";
import { FormattedMessage } from "react-intl";

type ConfirmButtonProps = {
  onDoneButtonClicked: () => void;
  position?: "start" | "end";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ConfirmButton({
  onDoneButtonClicked,
  position,
  ...rest
}: ConfirmButtonProps) {
  return (
    <div
      className={`flex ms-14 ${
        position === "start" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <button
        onClick={onDoneButtonClicked}
        className="text-white py-2 px-4 rounded-md bg-lahav hover:bg-fuchsia-900 active:bg-fuchsia-950"
        {...rest}
      >
        <FormattedMessage id={"confirm"} />
      </button>
    </div>
  );
}
