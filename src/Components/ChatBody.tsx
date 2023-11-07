import { BotMessage, UserMessage } from "./ChatMessage";
import { SelectionBoxList } from "./SelectionBoxList";

export function ChatBody() {
  return (
    <div className="flex flex-col flex-1 min-h-[200px] overflow-y-auto p-4 bg-slate-100 gap-3">
      <BotMessage
        message="היי! הגעתם לבוט של לה״ב. נשמח לסייע ולהפנות אותך לאן שאתה צריך. האם אתה:"
        timestamp={new Date()}
      />
      <SelectionBoxList
        boxes={[
          { text: "הורה לפג" },
          { text: "בהריון בסיכון" },
          { text: "צוות מקצועי" },
          { text: "מעוניין לתרום" },
          { text: "אחר" },
        ]}
      />
      <BotMessage message="בן כמה הפג שלך?" timestamp={new Date()} />
      <UserMessage message="3 חודשים" timestamp={new Date()} />
      <BotMessage message="איזה שבוע הוא נולד?" timestamp={new Date()} />
      <UserMessage message="שבוע 33" timestamp={new Date()} />
      <UserMessage
        message="עוד שאלה ארוכה מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד"
        timestamp={new Date()}
      />
      <BotMessage message="אוקי, תן לי לבדוק את זה" timestamp={new Date()} />
      <BotMessage message="Hi" timestamp={new Date()} />
      <BotMessage message="Hi" timestamp={new Date()} />
      <BotMessage message="Hi" timestamp={new Date()} />
    </div>
  );
}
