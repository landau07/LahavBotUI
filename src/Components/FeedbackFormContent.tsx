import { FormEvent, useState } from "react";
import { Frown, Meh, Smile } from "react-feather";
import { FormattedMessage, useIntl } from "react-intl";
import { cn } from "../utils/classnames";
import {
  mouseDownTransitionDownClassNames,
  mouseHoverScaleUpClassNames,
} from "../utils/sharedClassNames";
import { ConfirmButton } from "./ConfirmButton";

type FeedbackFormContentProps = {
  onClose: () => void;
};

export function FeedbackFormContent({ onClose }: FeedbackFormContentProps) {
  const [feedback, setFeedback] = useState<"Good" | "Natural" | "Bad">();
  const [text, setText] = useState<string>("");
  const [isFeedbackProvided, setIsFeedbackProvided] = useState(false);
  const intl = useIntl();

  function submitFeedback(e: FormEvent) {
    e.preventDefault();
    console.log({ feedback, text });
    setIsFeedbackProvided(true);
  }

  if (isFeedbackProvided) {
    return (
      <div className="flex flex-col gap-3">
        <FormattedMessage id="thanksIWillSendTheDetails" />
        <ConfirmButton
          type="button"
          position="start"
          buttonTextId="close"
          onClick={onClose}
        />
      </div>
    );
  }

  return (
    <form onSubmit={submitFeedback} className="p-3 flex flex-col gap-4">
      <FormattedMessage id="whatDoYouThinkAboutMe" />
      <div className="flex gap-5 justify-evenly my-1 h-10">
        <button type={"button"} onClick={() => setFeedback("Good")}>
          <Smile
            className={cn(
              "h-10 w-10 text-green-500 bg-green-300 bg-opacity-20 cursor-pointer rounded-full",
              mouseDownTransitionDownClassNames,
              mouseHoverScaleUpClassNames,
              feedback === "Good" && "scale-125 hover:scale-125 animate-bounce"
            )}
          />
        </button>
        <button type={"button"} onClick={() => setFeedback("Natural")}>
          <Meh
            className={cn(
              "h-10 w-10 text-yellow-500 bg-yellow-400 bg-opacity-20 cursor-pointer rounded-full",
              mouseDownTransitionDownClassNames,
              mouseHoverScaleUpClassNames,
              feedback === "Natural" &&
                "scale-125 hover:scale-125 animate-bounce"
            )}
          />
        </button>
        <button type={"button"} onClick={() => setFeedback("Bad")}>
          <Frown
            className={cn(
              "h-10 w-10 text-red-400 bg-red-400 bg-opacity-20 cursor-pointer rounded-full",
              mouseDownTransitionDownClassNames,
              mouseHoverScaleUpClassNames,
              feedback === "Bad" && "scale-125 hover:scale-125 animate-bounce"
            )}
          />
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        maxLength={500}
        className={cn(
          "w-full border-2 border-stone-400 overflow-y-hidden p-3 rounded-lg pr-4",
          "dark:border-stone-700 dark:bg-[#00000049]",
          "resize-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
        )}
        placeholder={intl.formatMessage({ id: "alsoANiceWord" })}
      />
      <ConfirmButton
        type="submit"
        position="start"
        disabled={!feedback && !text}
        buttonTextId="send"
      />
    </form>
  );
}
