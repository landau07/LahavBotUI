import { ButtonHTMLAttributes } from "react";

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
      className={`flex me-14 ${
        position === "start" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <button
        onClick={onDoneButtonClicked}
        className="text-white py-2 px-4 rounded-md bg-lahav hover:bg-fuchsia-900 active:bg-fuchsia-950"
        {...rest}
      >
        {"אשר"}
      </button>
    </div>
  );
}
