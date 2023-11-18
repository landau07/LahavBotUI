export const messageTextClassNames =
  "text-slate-800 dark:text-white text-start";

export const inputNumberClassNames =
  "w-16 border border-slate-900 bg-[#28323770] rounded-lg px-3 py-2 focus:border-blue-500";

export const mouseDownTransitionDownClassNames =
  "transition-transform transform active:translate-y-0.5";

export const mouseHoverScaleUpClassNames =
  "hover:scale-110 transition-transform duration-100";

export const lahavBgColor = (colorTheme: "pink" | "blue") => {
  return colorTheme === "pink" ? "bg-lahavPink" : "bg-sky-600";
};

export const linkColor =
  "text-blue-500 hover:text-blue-600 dark:text-skylight-500 dark:hover:text-skylight-600";
