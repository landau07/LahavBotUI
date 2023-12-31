import { format } from "date-fns";
import { HTMLProps, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { colorTheme } from "../signals";
import { cn } from "../utils/classnames";
import { lahavBgColor } from "../utils/sharedClassNames";
import { LahavAvatar } from "./ChatHeader";

type ChatMessageProps = {
  children: ReactNode;
  sender: "user" | "bot";
  timestamp?: Date;
  showNameAndAvatar?: boolean;
} & HTMLProps<HTMLDivElement>;

export function ChatMessage({ sender, ...rest }: ChatMessageProps) {
  if (sender === "bot") {
    return <BotMessage {...rest} />;
  } else {
    return <UserMessage {...rest} />;
  }
}

function BotMessage({
  children,
  timestamp,
  className: classNameFromProps = "",
  showNameAndAvatar = true,
  ...restDivProps
}: Omit<ChatMessageProps, "sender">) {
  return (
    <div className="flex select-none">
      {showNameAndAvatar && <LahavAvatar addClassName="mt-4 me-3" />}
      <div
        className={cn(
          "flex flex-col text-start",
          showNameAndAvatar === false && "ms-14"
        )}
      >
        {showNameAndAvatar && (
          <div className="phone:text-lg font-bold text-zinc-700 dark:text-slate-200">
            <FormattedMessage id="lahav" />
          </div>
        )}
        <div
          className={`p-4 rounded-e-xl text-sm phone:text-base rounded-b-xl bg-slate-200 dark:bg-[#272822] text-start ${classNameFromProps}`}
          {...restDivProps}
        >
          {children}
        </div>
        <div className="text-xs font-normal me-1 mt-1 text-slate-600 dark:text-white">
          {timestamp && format(timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  );
}

function UserMessage({
  children,
  timestamp,
}: Omit<ChatMessageProps, "sender">) {
  return (
    <div className="flex flex-row-reverse">
      <div className="flex flex-col">
        <div
          className={cn(
            "text-sm phone:text-base",
            "text-white p-4 rounded-s-xl rounded-b-xl",
            lahavBgColor(colorTheme.value)
          )}
        >
          {children}
        </div>
        <div className="text-xs font-normal ms-1 mt-1 text-slate-600">
          {timestamp && format(timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  );
}
