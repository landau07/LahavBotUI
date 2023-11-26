import { useState } from "react";
import { Globe, Moon, Smile, Sun } from "react-feather";
import { useIntl } from "react-intl";
import femaleIcon from "../icons/femaleIcon.png";
import lahavLogo from "../icons/lahavIcon.jpeg";
import maleIcon from "../icons/maleIcon.png";
import {
  colorTheme,
  isDarkMode,
  toggleColorTheme,
  toggleLocale,
} from "../signals";
import { cn } from "../utils/classnames";
import {
  lahavBgColor,
  mouseDownTransitionDownClassNames,
  mouseHoverScaleUpClassNames,
} from "../utils/sharedClassNames";
import { FeedbackFormContent } from "./FeedbackFormContent";
import { Modal } from "./Modal";

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
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 p-6 flex flex-row items-center w-full gap-3 rounded-t-md",
        lahavBgColor(colorTheme.value)
      )}
    >
      <a
        href="https://lahav-bot.netlify.app/"
        title={intl.formatMessage({ id: "openBotInNewTab" })}
        target="_blank"
      >
        <LahavAvatar />
      </a>
      <div className="w-3 h-3  bg-green-500 rounded-full absolute bottom-5 border-2 border-white start-12" />
      <div className="flex-1 select-none text-white text-2xl text-ellipsis overflow-auto">
        {intl.formatMessage({ id: "lahavBot" })}
      </div>
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        aria-label="Feedback"
        title="Feedback"
        className={mouseHoverScaleUpClassNames}
      >
        <Smile
          className={`text-slate-200 ${mouseDownTransitionDownClassNames} active:rotate-180`}
        />
      </button>
      <button
        onClick={toggleColorTheme}
        aria-label="Color theme"
        title="Color theme"
        className={mouseHoverScaleUpClassNames}
      >
        <img
          src={colorTheme.value === "pink" ? femaleIcon : maleIcon}
          style={{ filter: "invert(1)" }}
          className={`text-slate-200 h-6 me-1 ${mouseDownTransitionDownClassNames}`}
        />
      </button>
      <button
        onClick={toggleLocale}
        aria-label="Language"
        title="Language"
        className={mouseHoverScaleUpClassNames}
      >
        <Globe
          className={`text-slate-200 ${mouseDownTransitionDownClassNames}`}
        />
      </button>
      <button
        onClick={() => (isDarkMode.value = !isDarkMode.value)}
        aria-label={isDarkMode.value ? "Dark mode" : "Light mode"}
        title={isDarkMode.value ? "Dark mode" : "Light mode"}
        className={mouseHoverScaleUpClassNames}
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
      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      >
        <FeedbackFormContent onClose={() => setIsFeedbackModalOpen(false)} />
      </Modal>
    </header>
  );
}
