import { format } from "date-fns";
import { LahavAvatar } from "./ChatHeader";

type ChatMessageProps = {
  message: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export function ChatMessage({ message, sender, timestamp }: ChatMessageProps) {
  if (sender === "bot") {
    return <BotMessage message={message} timestamp={timestamp} />;
  } else {
    return <UserMessage message={message} timestamp={timestamp} />;
  }
}

export function BotMessage({
  message,
  timestamp,
}: Omit<ChatMessageProps, "sender">) {
  return (
    <div className="flex flex-row-reverse">
      <LahavAvatar addClassName="mt-4 ms-3" />
      <div className="flex flex-col text-end">
        <div className="text-lg font-bold text-zinc-700">לה״ב</div>
        <div className="p-4 rounded-s-xl rounded-b-xl bg-slate-200">
          {message}
        </div>
        <div className="text-xs font-normal me-1 mt-1 text-slate-600">
          {format(timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  );
}

export function UserMessage({
  message,
  timestamp,
}: Omit<ChatMessageProps, "sender">) {
  return (
    <div className="flex">
      <div className="flex flex-col ">
        <div className="text-white p-4 rounded-e-xl rounded-b-xl bg-lahav">
          {message}
        </div>
        <div className="text-xs font-normal ms-1 mt-1 text-slate-600">
          {format(timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  );
}
