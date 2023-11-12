import { ButtonHTMLAttributes } from "react";
import { FormattedMessage } from "react-intl";
import { mouseDownTransitionDownClassNames } from "../utils/sharedClassNames";

type ConfirmButtonProps = {
  onClick: () => void;
  position?: "start" | "end";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ConfirmButton({
  onClick,
  position = "end",
  ...rest
}: ConfirmButtonProps) {
  return (
    <div
      className={`flex mt-1 ms-14 ${
        position === "start" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <button
        onClick={onClick}
        className={`text-white py-2 px-4 rounded-md bg-lahav hover:bg-fuchsia-900 active:bg-fuchsia-950 ${mouseDownTransitionDownClassNames}`}
        {...rest}
      >
        <FormattedMessage id={"confirm"} />
      </button>
    </div>
  );
}
