import * as amplitude from "@amplitude/analytics-browser";

export function useMondayClient() {
  const logToMonday = async (data: Record<string, string | boolean>) => {
    try {
      return await fetch(
        "https://webhooks.integrately.com/a/webhooks/3ff5df2db2524c24ac567529669b5c62",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } catch (e) {
      console.log("Error while sending data to Monday", e);
      amplitude.track("Error", e as Record<string, string | boolean>);
    }
  };

  return logToMonday;
}
