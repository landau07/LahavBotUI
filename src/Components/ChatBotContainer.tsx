import { ChatBody } from "./ChatBody";
import "./ChatBotContainer.css";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";

export function ChatBotContainer() {
  return (
    <div className="chat-bot-container flex flex-col h-dvh-100">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}
