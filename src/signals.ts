import { effect, signal } from "@preact/signals-react";
import { ChatDecisionTreeNode, welcomeStep } from "./ChatDecisionTree";

export const chatSteps = signal<ChatDecisionTreeNode[]>([welcomeStep]);
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
