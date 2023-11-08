import { format } from "date-fns";
import { ReactNode } from "react";
import { LahavAvatar } from "./ChatHeader";

type ChatMessageProps = {
  children: ReactNode | string;
  sender: "user" | "bot";
  timestamp?: Date;
};

export function ChatMessage({ sender, ...rest }: ChatMessageProps) {
  if (sender === "bot") {
    return <BotMessage {...rest} />;
  } else {
    return <UserMessage {...rest} />;
  }
}

export function BotMessage({
  children: message,
  timestamp,
}: Omit<ChatMessageProps, "sender">) {
  return (
    <div className="flex flex-row-reverse">
      <LahavAvatar addClassName="mt-4 ms-3" />
      <div className="flex flex-col text-end">
        <div className="text-lg font-bold text-zinc-700 dark:text-slate-200">
          לה״ב
        </div>
        <div className="p-4 rounded-s-xl rounded-b-xl bg-slate-200 dark:bg-[#272822]">
          {message}
        </div>
        <div className="text-xs font-normal me-1 mt-1 text-slate-600">
          {timestamp && format(timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  );
}

export function UserMessage({
  children,
  timestamp,
}: Omit<ChatMessageProps, "sender">) {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="text-white p-4 rounded-e-xl rounded-b-xl bg-lahav">
          {children}
        </div>
        <div className="text-xs font-normal ms-1 mt-1 text-slate-600">
          {timestamp && format(timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  );
}
