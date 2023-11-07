type SelectionBoxProps = {
  boxes: string[];
  onBoxClicked: (boxIndex: number) => void;
};

export function SelectionBoxList({ boxes, onBoxClicked }: SelectionBoxProps) {
  return (
    <div className="flex justify-start me-14 flex-wrap mb-3 gap-2 items-center">
      {boxes.map((boxText, i) => (
        <button
          className="break-words text-sm rounded-md border text-lahav border-lahav active:bg-fuchsia-900 active:bg-opacity-50 py-2 px-4 hover:bg-opacity-10 hover:bg-lahav"
          key={i}
          onClick={() => onBoxClicked(i)}
        >
          {boxText}
        </button>
      ))}
    </div>
  );
}
