import { ChangeEvent, useState } from "react";
import { Send } from "react-feather";
import { useIntl } from "react-intl";

export function ChatFooter() {
  const [message, setMessage] = useState<string>("");
  const intl = useIntl();

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Handle sending the message here, e.g., by calling an API or a function to send the message.
    // You can use the 'message' state to get the message content.
    // Reset the message input after sending if needed.
    setMessage("");
  };

  return (
    <footer className="py-4 px-6 sticky bottom-0 border-t-2 bg-slate-100 dark:bg-[#00000036] border-gray-200 dark:border-gray-500 rounded-b-md">
      <div className="flex">
        <div className="relative w-full flex">
          <input
            type="text"
            className="w-full bg-rgb-176-193-212 p-2 rounded-lg pr-4 h-10 resize-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder={intl.formatMessage({ id: "typeMessage" })}
            value={message}
            onChange={handleMessageChange}
          />
          <button className="p-2" onClick={handleSendMessage}>
            <Send className="text-gray-400 rtl:scale-x-[-1]" size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
