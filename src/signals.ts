import { effect, signal } from "@preact/signals-react";

const IS_DARK_MODE = "isDarkMode";
const LOCALE = "locale";

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

// Locate:
const localeFromLocalStorage =
  localStorage.getItem(LOCALE) === "en" ? "en" : "he";
export const locale = signal<"he" | "en">(localeFromLocalStorage);
export const toggleLocale = () => {
  locale.value = locale.value === "he" ? "en" : "he";
  localStorage.setItem(LOCALE, locale.value);
};
