import { ButtonHTMLAttributes } from "react";
import { FormattedMessage } from "react-intl";
import { colorTheme } from "../signals";
import { cn } from "../utils/classnames";
import {
  lahavBgColor as lahavBgColorLightMode,
  mouseDownTransitionDownClassNames,
} from "../utils/sharedClassNames";

type ConfirmButtonProps = {
  onClick?: () => void;
  position?: "start" | "end";
  buttonTextId?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ConfirmButton({
  onClick,
  position = "end",
  disabled,
  buttonTextId = "confirm",
  ...rest
}: ConfirmButtonProps) {
  return (
    <div
      className={`flex mt-1 ms-14 ${
        position === "start" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <button
        onClick={!onClick || disabled ? undefined : onClick}
        className={cn(
          `text-white py-2 px-4 rounded-md`,
          lahavBgColorLightMode(colorTheme.value),
          colorTheme.value === "pink" &&
            "hover:bg-fuchsia-900 active:bg-fuchsia-950 focus:bg-fuchsia-900",
          colorTheme.value === "blue" &&
            "hover:bg-sky-700 active:bg-sky-800 focus:bg-sky-700 " +
              "dark:bg-sky-600 dark:hover:bg-sky-700 dark:active:bg-sky-800 dark:focus:bg-sky-700",
          disabled ? "" : mouseDownTransitionDownClassNames,
          disabled &&
            "pointer-events-auto border-gray-600 border bg-gray-500 hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-500"
        )}
        disabled={disabled}
        {...rest}
      >
        <FormattedMessage id={buttonTextId} />
      </button>
    </div>
  );
}
