import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { FormattedMessage } from "react-intl";
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
    if (!isMobile) {
      firstBoxRef.current?.focus();
    }
  }, []);

  return (
    <div className="flex flex-row justify-end ms-14 flex-wrap mb-3 gap-2">
      {boxes.map((box, i) => (
        <button
          className={cn(
            "break-words text-sm rounded-md border text-lahav border-lahav dark:text-lahav-dark dark:border-lahav-dark active:bg-fuchsia-900 active:bg-opacity-50 py-2 px-4 hover:bg-opacity-10 hover:bg-lahav",
            selectedBox === i &&
              "bg-opacity-50 hover:bg-opacity-50 bg-fuchsia-600 hover:bg-fuchsia-500 dark:bg-fuchsia-950 dark:hover:bg-fuchsia-900",
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
