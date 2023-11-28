import { ChangeEvent, useEffect, useRef, useState } from "react";
import { isDesktop } from "react-device-detect";
import { Send } from "react-feather";
import { useIntl } from "react-intl";
import {
  assistanceTopicsAnswerStep,
  howCanWeHelpYouQuestion,
  inviteToHospitalWhatsApp,
  joinOurFacebookStep,
  whatAreYouInterestedAboutOptions,
} from "../DecisionTree/StepsDefinitions";
import { ChatDecisionTreeNode } from "../DecisionTree/types";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import { textBarEnabled } from "../signals";

export function ChatFooter() {
  const [message, setMessage] = useState<string>("");
  const intl = useIntl();
  const { pushNewStep, chatSteps, lastStep } = useDecisionTree();
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    const userMessage: ChatDecisionTreeNode = {
      id: new Date().getTime().toString(),
      type: "text",
      sender: "user",
      content: message,
      timestamp: new Date(),
      branchKey: 0,
      children: [],
      parent: chatSteps[chatSteps.length - 1],
      shouldLocalizeData: false,
      result: {
        value: message,
        localized: message,
      },
    };
    const botAnswer: ChatDecisionTreeNode = {
      id: new Date().getTime().toString(),
      type: "text",
      sender: "bot",
      content:
        lastStep.id === howCanWeHelpYouQuestion.id
          ? "thanksForContactingUs"
          : "",
      branchKey: 0,
      children: [],
      parent: userMessage,
      shouldLocalizeData: true,
    };

    const shouldFollowBotThankYouMessageWithFacebookStep =
      lastStep.id === howCanWeHelpYouQuestion.id &&
      lastStep.parent!.id !== assistanceTopicsAnswerStep.id &&
      lastStep.parent!.id !== whatAreYouInterestedAboutOptions.id;

    if (shouldFollowBotThankYouMessageWithFacebookStep) {
      // For whatAreYouInterestedAboutOptions flow we end with the Thank you message,
      // So we won't add any children
      botAnswer.children = [
        {
          ...joinOurFacebookStep,
          children: [{ ...inviteToHospitalWhatsApp, children: [] }],
        },
      ];
    }

    const newSteps = [userMessage];
    if (lastStep.id === howCanWeHelpYouQuestion.id) {
      newSteps.push(botAnswer);
    }
    pushNewStep(...newSteps);
    setMessage("");
    if (ref.current) {
      ref.current.style.height = "2.5em";
    }
    textBarEnabled.value = false;
  };

  const handleTextareaResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const numberOfLines = event.target.value.split("\n").length || 1;
    event.target.style.height = `${numberOfLines * 2.5}em`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent the default behavior of Enter to avoid creating a new line
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (textBarEnabled.peek() && isDesktop) {
      ref.current?.focus();
    }
  }, [textBarEnabled.value]);

  return (
    <footer className="py-4 px-6 sticky bottom-0 border-t-2 bg-slate-100 dark:bg-[#00000036] border-gray-200 dark:border-gray-500 rounded-b-md">
      <div className="flex">
        <div className="relative w-full flex">
          <textarea
            ref={ref}
            disabled={!textBarEnabled.value}
            className="w-full overflow-y-hidden bg-rgb-176-193-212 p-2 rounded-lg pr-4 h-10 resize-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder={
              intl.formatMessage({ id: "typeMessage" }) +
              intl.formatMessage({ id: "dontForgetPhoneOrEmail" })
            }
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            onInput={handleTextareaResize}
          />
          <button
            disabled={!textBarEnabled.value}
            className="p-2"
            onClick={handleSendMessage}
            aria-label="Send message"
          >
            <Send className="text-gray-400 rtl:scale-x-[-1]" size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
