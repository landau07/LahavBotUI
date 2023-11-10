import { useContext } from "react";
import { DecisionTreeContext } from "./DecisionTreeContext";

export function useDecisionTree() {
  const context = useContext(DecisionTreeContext);
  if (!context) {
    throw new Error(
      "useDecisionTree must be used within a DecisionTreeProvider"
    );
  }
  return context;
}
