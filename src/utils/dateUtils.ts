import { format } from "date-fns";
import { enUS, he } from "date-fns/locale";
import { locale } from "../signals";

export const dateToString = (date: Date) => {
  const fnsLocale = locale.value === "he" ? he : enUS;
  return format(date, "PPP", { locale: fnsLocale });
};
