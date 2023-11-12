import { useContext } from "react";
import { CurrentStepContext } from "./CurrentStepContext";

export function useCurrentStep() {
  const context = useContext(CurrentStepContext);
  if (!context) {
    throw new Error(
      "useCurrentStep must be used within a CurrentStepContext.Provider"
    );
  }
  return context;
}
