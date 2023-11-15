import { ChatBody } from "./ChatBody";
import "./ChatBotContainer.css";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";

export function ChatBotContainer() {
  return (
    <div className="chat-bot-container">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}
