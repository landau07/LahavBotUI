import { useState } from "react";
import { cn } from "../utils/classnames";
import { FormattedMessage } from "react-intl";

type SelectionBoxProps = {
  boxes: string[];
  onBoxClicked: (boxIndex: number) => void;
};

export function SelectionBoxList({ boxes, onBoxClicked }: SelectionBoxProps) {
  const [selectedBox, setSelectedBox] = useState(-1);

  return (
    <div className="flex flex-row justify-end ms-14 flex-wrap mb-3 gap-2">
      {boxes.map((boxTextId, i) => (
        <button
          className={cn(
            "break-words text-sm rounded-md border text-lahav border-lahav dark:text-lahav-dark dark:border-lahav-dark active:bg-fuchsia-900 active:bg-opacity-50 py-2 px-4 hover:bg-opacity-10 hover:bg-lahav",
            selectedBox === i &&
              "bg-opacity-50 hover:bg-opacity-50 bg-fuchsia-600 hover:bg-fuchsia-500 dark:bg-fuchsia-950 dark:hover:bg-fuchsia-900"
          )}
          key={i}
          onClick={() => {
            onBoxClicked(i);
            setSelectedBox(i);
          }}
        >
          <FormattedMessage id={boxTextId} />
        </button>
      ))}
    </div>
  );
}
