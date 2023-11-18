import { useEffect, useRef, useState } from "react";
import { isDesktop } from "react-device-detect";
import { FormattedMessage } from "react-intl";
import { colorTheme } from "../signals";
import { cn } from "../utils/classnames";
import { mouseDownTransitionDownClassNames } from "../utils/sharedClassNames";

type SelectionBoxProps = {
  boxes: string[];
  onBoxClicked: (boxIndex: number) => void;
  shouldLocalizeData: boolean;
};

export function SelectionBoxList({
  boxes,
  onBoxClicked,
  shouldLocalizeData,
}: SelectionBoxProps) {
  const [selectedBox, setSelectedBox] = useState(-1);
  const firstBoxRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isDesktop) {
      firstBoxRef.current?.focus();
    }
  }, []);

  return (
    <div className="flex flex-row justify-end ms-14 flex-wrap mb-3 gap-2">
      {boxes.map((box, i) => (
        <button
          className={cn(
            "break-words text-sm rounded-md border active:bg-opacity-50 py-2 px-4 hover:bg-opacity-10",
            colorTheme.value === "pink" &&
              "text-lahavPink border-lahavPink dark:text-lahavPink-dark dark:border-lahavPink-dark hover:bg-lahavPink active:bg-fuchsia-900",
            selectedBox === i &&
              colorTheme.value === "pink" &&
              "bg-opacity-30 hover:bg-opacity-50 bg-fuchsia-600 hover:bg-fuchsia-500 dark:bg-fuchsia-950 dark:hover:bg-fuchsia-900",
            colorTheme.value === "blue" &&
              "text-sky-600 border-sky-600 dark:text-sky-500 dark:border-sky-500 hover:bg-sky-500 active:bg-sky-800",
            selectedBox === i &&
              colorTheme.value === "blue" &&
              "bg-opacity-50 hover:bg-opacity-50 bg-sky-300 hover:bg-sky-100 dark:bg-blue-900 dark:bg-opacity-60 dark:hover:bg-blue-950",
            mouseDownTransitionDownClassNames
          )}
          key={i}
          ref={i === 0 ? firstBoxRef : null}
          onClick={() => {
            onBoxClicked(i);
            setSelectedBox(i);
          }}
        >
          {shouldLocalizeData ? <FormattedMessage id={box} /> : box}
        </button>
      ))}
    </div>
  );
}
