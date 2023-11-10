import { effect, signal } from "@preact/signals-react";

// Fetch isDarkMode from localStorage:
const isDarkModeFromLocalStorage =
  Boolean(localStorage.getItem("isDarkMode")) ?? false;
export const isDarkMode = signal<boolean>(isDarkModeFromLocalStorage);

// On isDarkMode changes:
effect(() => {
  document.documentElement.classList.toggle("dark", isDarkMode.value);
  document.documentElement.style.setProperty(
    "color-scheme",
    isDarkMode.value ? "dark" : "light"
  );
  localStorage.setItem("isDarkMode", isDarkMode.value ? "1" : "");
});

export const locale = signal<"he" | "en">("he");
export const toggleLocale = () =>
  (locale.value = locale.value === "he" ? "en" : "he");
