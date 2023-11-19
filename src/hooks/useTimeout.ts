import { useCallback, useEffect, useRef } from "react";

type Callback = () => void;

export default function useTimeout(callback: Callback, delay: number) {
  const callbackRef = useRef<Callback>(callback);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
