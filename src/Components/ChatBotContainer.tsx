import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";

export function ChatBotContainer() {
  return (
    <div className="tablet:px-[10%] laptop:px-[20%] desktop:px-[30%]">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}
