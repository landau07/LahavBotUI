import lahavLogo from "../assets/lahavIcon.jpeg";
import { cn } from "../utils/classnames";

export function LahavAvatar({ addClassName }: { addClassName?: string }) {
  return (
    <img
      src={lahavLogo}
      role={"presentation"}
      className={cn("h-10 w-10 bg-white rounded-full p-1", addClassName)}
    />
  );
}

export function ChatHeader() {
  return (
    <div className="sticky top-0 p-6 bg-lahav flex flex-row align-middle w-full gap-3 rounded-t-md">
      <LahavAvatar />
      <div className="text-white text-2xl text-ellipsis overflow-auto">לה״ב בוט</div>
      <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-5 border-2 border-white start-12" />
    </div>
  );
}
