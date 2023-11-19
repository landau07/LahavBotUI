import { differenceInMonths, differenceInYears, format, parse } from "date-fns";
import { enUS, he } from "date-fns/locale";
import { IntlShape } from "react-intl";
import { locale } from "../signals";

const FNS_FORMAT = "PPP";

export const dateToString = (date: Date) => {
  const fnsLocale = locale.value === "he" ? he : enUS;
  return format(date, FNS_FORMAT, { locale: fnsLocale });
};

export const stringToDate = (dateString: string) => {
  const fnsLocale = locale.value === "he" ? he : enUS;
  return parse(dateString, FNS_FORMAT, new Date(), { locale: fnsLocale });
};

export const calculateAgeAtDate = (
  birthday: Date,
  targetDate: Date
): { years: number; months: number } => {
  // Calculate the difference in months
  const months = differenceInMonths(targetDate, birthday);
  // Calculate the difference in years
  const years = differenceInYears(targetDate, birthday);

  return { years, months: (months % 12) };
};

// Example output: "1 year and 3 months"
export const formatAge = (years: number, months: number, intl: IntlShape) => {
  const formattedYears =
    years > 0
      ? `${years} ${
          years === 1
            ? intl.formatMessage({ id: "year" })
            : intl.formatMessage({ id: "years" })
        }`
      : "";
  const formattedMonths =
    months > 0
      ? `${months} ${
          months === 1
            ? intl.formatMessage({ id: "month" })
            : intl.formatMessage({ id: "months" })
        }`
      : "";

  // Combine the formatted strings with ' and ' in between
  return [formattedYears, formattedMonths]
    .filter(Boolean)
    .join(` ${intl.formatMessage({ id: "and" })} `);
};
