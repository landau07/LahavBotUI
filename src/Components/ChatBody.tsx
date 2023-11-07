import { BotMessage, UserMessage } from "./ChatMessage";
import { DropdownMessage } from "./DropdownMessage";
import { SelectionBoxList } from "./SelectionBoxList";

export function ChatBody() {
  return (
    <div className="flex flex-col flex-1 min-h-[200px] overflow-y-auto p-4 bg-slate-100 gap-3">
      <BotMessage
        children="היי! הגעתם לבוט של לה״ב. נשמח לסייע ולהפנות אותך לאן שאתה צריך. האם אתה:"
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
      <BotMessage children="בן כמה הפג שלך?" timestamp={new Date()} />
      <UserMessage children="3 חודשים" timestamp={new Date()} />
      <BotMessage children="איזה שבוע הוא נולד?" timestamp={new Date()} />
      <UserMessage children="שבוע 33" timestamp={new Date()} />
      <UserMessage
        children="עוד שאלה ארוכה מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד מאוד"
        timestamp={new Date()}
      />
      <BotMessage children="אוקי, תן לי לבדוק את זה" timestamp={new Date()} />
      <DropdownMessage
        text="איזה פגיה אתם?"
        options={[
          "תל השומר",
          "שיבא",
          "שניידר",
          "רמב״ם",
          "שערי צדק",
          "סורוקה",
          "וולפסדון",
          "סורוקה",
          "אחר",
        ]}
      />
      <BotMessage children="Hi" timestamp={new Date()} />
      <BotMessage children="Hi" timestamp={new Date()} />
    </div>
  );
}
