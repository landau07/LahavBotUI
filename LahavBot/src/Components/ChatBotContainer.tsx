import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";

export function ChatBotContainer() {
  return (
    <div className="px-[30%] flex flex-col">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}
