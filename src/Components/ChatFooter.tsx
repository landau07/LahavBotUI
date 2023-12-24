import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { isDesktop } from "react-device-detect";
import { Send } from "react-feather";
import { useIntl } from "react-intl";
import {
  assistanceTopicsAnswerStep,
  bankTransferOptionDetails,
  doYouNeedFurtherAssistanceQuestion,
  enterContactInfo,
  howCanWeHelpYouQuestion,
  inviteToHospitalWhatsApp,
  joinOurFacebookStep,
  whatAreYouInterestedAboutOptions,
  whatIsYourEmail,
  whatIsYourName,
} from "../DecisionTree/StepsDefinitions";
import { ChatDecisionTreeNode } from "../DecisionTree/types";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import { textBarEnabled } from "../signals";
import { cn } from "../utils/classnames";

const USER_NAME = "user_name";
const USER_EMAIL = "user_email";
const USER_CONTACT_INFO = "user_contact_info";

export function ChatFooter() {
  const [message, setMessage] = useState<string>("");
  const intl = useIntl();
  const { pushNewStep, chatSteps } = useDecisionTree();
  const lastStep = chatSteps[chatSteps.length - 1];
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    const userMessage: ChatDecisionTreeNode = {
      id: "userMessage",
      type: "text",
      sender: "user",
      content: message,
      timestamp: new Date(),
      branchKey: 0,
      children: [],
      parent: lastStep,
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
          : lastStep.id === whatIsYourName.id &&
            lastStep?.parent?.id === bankTransferOptionDetails.id // This is the only flow that has different followup question
          ? "whatIsYourEmail"
          : lastStep.id === whatIsYourName.id
          ? "whatIsYourEmail"
          : lastStep.id === whatIsYourEmail.id
          ? "doYouNeedFurtherAssistance"
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

    const newSteps: ChatDecisionTreeNode[] = [userMessage];
    if (lastStep.id === howCanWeHelpYouQuestion.id) {
      newSteps.push(botAnswer);
    } else if (
      lastStep.id === whatIsYourName.id &&
      lastStep?.parent?.id === bankTransferOptionDetails.id // This is the only flow that has different followup question
    ) {
      localStorage.setItem(USER_NAME, message);
      newSteps.push({ ...whatIsYourEmail, parent: lastStep });
    } else if (lastStep.id === whatIsYourName.id) {
      localStorage.setItem(USER_NAME, message);
      newSteps.push({ ...enterContactInfo, parent: lastStep });
    } else if (lastStep.id === whatIsYourEmail.id) {
      localStorage.setItem(USER_EMAIL, message);
      newSteps.push(doYouNeedFurtherAssistanceQuestion);
    } else if (lastStep.id === enterContactInfo.id) {
      localStorage.setItem(USER_CONTACT_INFO, message);
      newSteps.push(howCanWeHelpYouQuestion);
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
      if (ref.current?.value) {
        handleSendMessage();
      }
    }
  };

  const loadNameAndEmailFromLocalStorageIfNeeded = useCallback(() => {
    if (lastStep.id === whatIsYourName.id) {
      const nameFromLocalStorage = localStorage.getItem(USER_NAME);
      if (nameFromLocalStorage) {
        setMessage(nameFromLocalStorage);
      }
    }
    if (lastStep.id === whatIsYourEmail.id) {
      const emailFromLocalStorage = localStorage.getItem(USER_EMAIL);
      if (emailFromLocalStorage) {
        setMessage(emailFromLocalStorage);
      }
    }
    if (lastStep.id === enterContactInfo.id) {
      const contactInfoFromLocalStorage =
        localStorage.getItem(USER_CONTACT_INFO);
      if (contactInfoFromLocalStorage) {
        setMessage(contactInfoFromLocalStorage);
      }
    }
  }, [lastStep.id]);

  useEffect(() => {
    if (textBarEnabled.peek() && isDesktop) {
      ref.current?.focus();
      loadNameAndEmailFromLocalStorageIfNeeded();
    }
    // We need to have textBarEnabled.value in the array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textBarEnabled.value, loadNameAndEmailFromLocalStorageIfNeeded]);

  return (
    <footer className="py-4 px-6 sticky bottom-0 border-t-2 bg-slate-100 dark:bg-[#00000036] border-gray-200 dark:border-gray-500 rounded-b-md">
      <div className="flex">
        <div className="relative w-full flex">
          <textarea
            ref={ref}
            disabled={!textBarEnabled.value}
            className={cn(
              "w-full overflow-y-hidden bg-rgb-176-193-212 p-2 rounded-lg pr-4 h-10 resize-none outline-none",
              "focus:outline-none focus:ring-2 focus:ring-blue-600",
              !textBarEnabled.value && "cursor-not-allowed"
            )}
            placeholder={
              textBarEnabled.value
                ? intl.formatMessage({ id: "typeMessage" })
                : intl.formatMessage({ id: "chooseOptionOnChat" })
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
            <Send
              className={cn(
                textBarEnabled.value ? "text-gray-400" : "text-gray-600",
                !textBarEnabled.value && "cursor-not-allowed",
                "rtl:scale-x-[-1]"
              )}
              size={20}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
