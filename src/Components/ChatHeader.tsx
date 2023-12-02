import { useState } from "react";
import { ExternalLink, Globe, Moon, Smile, Sun } from "react-feather";
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

const headerIconClassNames = `text-slate-200 ${mouseDownTransitionDownClassNames} h-5 phone:h-6`;

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
        "sticky top-0 p-3 phone:p-6 flex flex-row items-center w-full gap-2 phone:gap-3 rounded-t-md",
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
      <div className="w-3 h-3 bg-green-500 rounded-full absolute  border-2 border-white start-11  bottom-4 phone:start-12 phone:bottom-5" />
      <div className="flex-1 select-none text-white text-lg phone:text-2xl text-ellipsis overflow-auto">
        {intl.formatMessage({ id: "lahavBot" })}
      </div>
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        aria-label="Feedback"
        title="Feedback"
        className={mouseHoverScaleUpClassNames}
      >
        <Smile className={cn(headerIconClassNames, "active:rotate-180")} />
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
          className={cn(headerIconClassNames, "me-1")}
        />
      </button>
      <button
        onClick={toggleLocale}
        aria-label="Language"
        title="Language"
        className={mouseHoverScaleUpClassNames}
      >
        <Globe className={headerIconClassNames} />
      </button>
      <button
        onClick={() => (isDarkMode.value = !isDarkMode.value)}
        aria-label={isDarkMode.value ? "Dark mode" : "Light mode"}
        title={isDarkMode.value ? "Dark mode" : "Light mode"}
        className={mouseHoverScaleUpClassNames}
      >
        {isDarkMode.value ? (
          <Moon className={headerIconClassNames} />
        ) : (
          <Sun className={headerIconClassNames} />
        )}
      </button>
      <a
        href="https://lahav-bot.netlify.app/"
        title={intl.formatMessage({ id: "openBotInNewTab" })}
        target="_blank"
        className="phone:hidden"
      >
        <ExternalLink
          className={`text-slate-200 h-4 rtl:scale-x-[-1] absolute end-0 top-1`}
        />
      </a>
      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      >
        <FeedbackFormContent onClose={() => setIsFeedbackModalOpen(false)} />
      </Modal>
    </header>
  );
}
