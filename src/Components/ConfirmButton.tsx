import { ButtonHTMLAttributes } from "react";
import { FormattedMessage } from "react-intl";
import { cn } from "../utils/classnames";
import { mouseDownTransitionDownClassNames } from "../utils/sharedClassNames";

type ConfirmButtonProps = {
  onClick: () => void;
  position?: "start" | "end";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ConfirmButton({
  onClick,
  position = "end",
  disabled,
  ...rest
}: ConfirmButtonProps) {
  return (
    <div
      className={`flex mt-1 ms-14 ${
        position === "start" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <button
        onClick={disabled ? undefined : onClick}
        className={cn(
          `text-white py-2 px-4 rounded-md bg-lahav hover:bg-fuchsia-900 active:bg-fuchsia-950 focus:bg-fuchsia-900`,
          disabled ? "" : mouseDownTransitionDownClassNames,
          disabled &&
            "pointer-events-auto border-gray-600 border bg-gray-500 hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-500"
        )}
        disabled={disabled}
        {...rest}
      >
        <FormattedMessage id={"confirm"} />
      </button>
    </div>
  );
}
