import { createContext } from "react";
import "react-day-picker/dist/style.css";
import { ChatDecisionTreeNode } from "./types";

export const CurrentStepContext = createContext<ChatDecisionTreeNode | null>(
  null
);
