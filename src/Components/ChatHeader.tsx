import { Moon, Sun } from "react-feather";
import lahavLogo from "../assets/lahavIcon.jpeg";
import { isDarkMode } from "../signals";
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
    <div className="sticky top-0 p-6 bg-lahav flex flex-row items-center w-full gap-3 rounded-t-md">
      <LahavAvatar />
      <div className="flex-1 text-white text-2xl text-ellipsis overflow-auto">
        לה״ב בוט
      </div>
      <div className="w-3 h-3  bg-green-500 rounded-full absolute bottom-5 border-2 border-white start-12" />
      <button
        aria-label={isDarkMode.value ? "Dark mode" : "Light mode"}
        onClick={() => (isDarkMode.value = !isDarkMode.value)}
        className="transform hover:scale-110 transition-transform duration-100"
      >
        {isDarkMode.value ? (
          <Moon className="text-slate-200" />
        ) : (
          <Sun className="text-slate-200" />
        )}
      </button>
    </div>
  );
}
