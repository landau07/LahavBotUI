// IntlProviderWrapper.js
import { useComputed } from "@preact/signals-react";
import { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "../locales/en.json";
import heMessages from "../locales/he.json";
import { locale } from "../signals";



export function IntlProviderWrapper({ children }: { children: ReactNode }) {
  const messages = useComputed(() => {
    switch (locale.value) {
      case "he":
        document.documentElement.setAttribute("dir", "rtl");
        return heMessages;
      case "en":
        document.documentElement.setAttribute("dir", "ltr");
        return enMessages;
      default:
        document.documentElement.setAttribute("dir", "rtl");
        return heMessages;
    }
  });

  return (
    <IntlProvider locale={locale.value} messages={messages.value}>
      {children}
    </IntlProvider>
  );
}
