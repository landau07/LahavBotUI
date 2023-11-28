import * as amplitude from "@amplitude/analytics-browser";
import { ReactNode, useEffect } from "react";

export function AmplitudeInitializer({ children }: { children: ReactNode }) {
  useEffect(() => {
    amplitude.init("758d138f413c9e714e68e527ad112c02", {
      defaultTracking: true,
    });
  }, []);

  return <>{children}</>;
}
