import * as amplitude from "@amplitude/analytics-browser";
import { effect, signal } from "@preact/signals-react";

const IS_DARK_MODE = "isDarkMode";
const COLOR_THEME = "colorTheme";
const LOCALE = "locale";

// Dark mode:
// Fetch isDarkMode from localStorage:
const isDarkModeFromLocalStorage =
  Boolean(localStorage.getItem(IS_DARK_MODE)) ?? false;
export const isDarkMode = signal<boolean>(isDarkModeFromLocalStorage);

// On isDarkMode changes:
effect(() => {
  document.documentElement.classList.toggle("dark", isDarkMode.value);
  document.documentElement.style.setProperty(
    "color-scheme",
    isDarkMode.value ? "dark" : "light"
  );
  localStorage.setItem(IS_DARK_MODE, isDarkMode.value ? "1" : "");
});

// Color theme:
// Fetch colorTheme from localStorage:
const colorThemeFromLocalStorage =
  (localStorage.getItem(COLOR_THEME) as "pink" | "blue") ?? "pink";
document.documentElement.classList.add(colorThemeFromLocalStorage);
export const colorTheme = signal<"pink" | "blue">(colorThemeFromLocalStorage);
export const toggleColorTheme = () => {
  const newColor = colorTheme.value === "pink" ? "blue" : "pink";
  amplitude.track("Changing color theme", { newColor });
  colorTheme.value = newColor;
};

// On colorTheme changes:
effect(() => {
  document.documentElement.classList.toggle(
    "pink",
    colorTheme.value === "pink"
  );
  document.documentElement.classList.toggle(
    "blue",
    colorTheme.value === "blue"
  );
  localStorage.setItem(COLOR_THEME, colorTheme.value);
});

// Locale:
const localeFromLocalStorage =
  localStorage.getItem(LOCALE) === "en" ? "en" : "he";
document.documentElement.lang = localeFromLocalStorage;
export const locale = signal<"he" | "en">(localeFromLocalStorage);
export const toggleLocale = () => {
  const newLocale = locale.value === "he" ? "en" : "he";
  amplitude.track("Changing locale", { newLocale });
  locale.value = newLocale;
  document.documentElement.lang = locale.value;
  localStorage.setItem(LOCALE, locale.value);
};
export const textBarEnabled = signal<boolean>(false);
