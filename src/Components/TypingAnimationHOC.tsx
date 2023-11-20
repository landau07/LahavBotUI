import { ReactNode, useState } from "react";
import useTimeout from "../hooks/useTimeout";
import typingAnimation from "../icons/typingAnimation.gif";
import { cn } from "../utils/classnames";

export function TypingAnimationHOC({ children }: { children: ReactNode }) {
  const [isTyping, setIsTyping] = useState(true);
  useTimeout(() => setIsTyping(false), 1500);

  return isTyping ? (
    <div className="h-4 w-12">
      <img
        src={typingAnimation}
        alt="Typing"
        className="object-cover -translate-y-1.5 scale-125"
      />
    </div>
  ) : (
    // We want to render the children in hidden state so the
    // chat body will be scrolled to the bottom after rendering
    <div className={cn(isTyping && "hidden")}>{children}</div>
  );
}
