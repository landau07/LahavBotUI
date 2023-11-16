import { Globe, Moon, Sun } from "react-feather";
import { useIntl } from "react-intl";
import lahavLogo from "../icons/lahavIcon.jpeg";
import { isDarkMode, toggleLocale } from "../signals";
import { cn } from "../utils/classnames";
import { mouseDownTransitionDownClassNames } from "../utils/sharedClassNames";

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
  const intl = useIntl();
  return (
    <header className="sticky top-0 p-6 bg-lahav flex flex-row items-center w-full gap-3 rounded-t-md">
      <LahavAvatar />
      <div className="flex-1 select-none text-white text-2xl text-ellipsis overflow-auto">
        {intl.formatMessage({ id: "lahavBot" })}
      </div>
      <div className="w-3 h-3  bg-green-500 rounded-full absolute bottom-5 border-2 border-white start-12" />
      <button
        onClick={toggleLocale}
        aria-label="Language"
        className="hover:scale-110 transition-transform duration-100"
      >
        <Globe
          className={`text-slate-200 ${mouseDownTransitionDownClassNames}`}
        />
      </button>
      <button
        onClick={() => (isDarkMode.value = !isDarkMode.value)}
        aria-label={isDarkMode.value ? "Dark mode" : "Light mode"}
        className="transform hover:scale-110 transition-transform duration-100"
      >
        {isDarkMode.value ? (
          <Moon
            className={`text-slate-200 ${mouseDownTransitionDownClassNames}`}
          />
        ) : (
          <Sun
            className={`text-slate-200 ${mouseDownTransitionDownClassNames}`}
          />
        )}
      </button>
    </header>
  );
}
