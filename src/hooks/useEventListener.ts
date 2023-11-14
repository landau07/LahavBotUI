import { useEffect, useRef } from "react";

type EventListenerHook = (
  eventType: string,
  callback: (event: Event) => void,
  element?: HTMLElement | Window | Document | null
) => void;

export const useEventListener: EventListenerHook = (
  eventType,
  callback,
  element = window
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;

    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};
