import typingAnimation from "../icons/typingAnimation.gif";

export function TypingMessageContent() {
  return (
    <div className="h-4 w-12">
      <img
        src={typingAnimation}
        alt="Typing"
        className="object-cover -translate-y-1.5 scale-125"
      />
    </div>
  );
}
