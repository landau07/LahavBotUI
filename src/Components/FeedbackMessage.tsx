import { useState } from "react";
import { Frown, Smile } from "react-feather";
import { FormattedMessage } from "react-intl";
import { useCurrentStep } from "../DecisionTree/useCurrentStep";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import { textBarEnabled } from "../signals";
import { cn } from "../utils/classnames";
import {
  mouseDownTransitionDownClassNames,
  mouseHoverScaleUpClassNames,
} from "../utils/sharedClassNames";

export function FeedbackMessage() {
  const step = useCurrentStep();
  const { setNextStep } = useDecisionTree();
  const [feedback, setFeedback] = useState<"Good" | "Bad" | null>(null);

  const onFeedbackClick = (feedback: "Good" | "Bad") => {
    step.stepResult = {
      value: feedback,
      localized: feedback,
    };
    setFeedback(feedback);
    setNextStep(step);
    textBarEnabled.value = true;
  };

  return (
    <>
      <FormattedMessage id="whatDoYouThinkAboutMe" />
      <div className="flex gap-5 justify-evenly my-4 h-10">
        <button onClick={() => onFeedbackClick("Good")}>
          <Smile
            className={cn(
              "h-10 w-10 text-green-500 bg-green-300 bg-opacity-20 cursor-pointer rounded-full",
              mouseDownTransitionDownClassNames,
              mouseHoverScaleUpClassNames,
              feedback === "Good" && "scale-125 hover:scale-125 animate-bounce"
            )}
          />
        </button>
        <button onClick={() => onFeedbackClick("Bad")}>
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
    </>
  );
}
