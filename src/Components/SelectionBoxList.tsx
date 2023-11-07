type SelectionBoxProps = {
  boxes: {
    text: string;
    onClick?: () => void;
  }[];
};

export function SelectionBoxList({ boxes }: SelectionBoxProps) {
  return (
    <div className="flex justify-end me-14 flex-wrap mb-3 gap-2 items-center">
      {boxes.map((box, i) => (
        <div
          className="cursor-pointer break-words text-sm rounded-md border text-lahav border-lahav py-2 px-4 hover:bg-opacity-10 hover:bg-lahav transition-background duration-150 ease-out delay-0"
          key={i}
        >
          {box.text}
        </div>
      ))}
    </div>
  );
}
