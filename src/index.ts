import { useEffect, useRef, useState } from "react";

export interface UseDebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function useDebounce<T>(
  value: T,
  delay: number,
  options: UseDebounceOptions = {}
) {
  const { leading = false, trailing = true } = options;

  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shouldCallLeading = leading && !lastCallRef.current;

    if (shouldCallLeading) {
      setDebouncedValue(value);
      lastCallRef.current = true;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (trailing) {
        setDebouncedValue(value);
      }
      lastCallRef.current = false;
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay, leading, trailing]);

  const cancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      lastCallRef.current = false;
    }
  };

  const flush = () => {
    cancel();
    setDebouncedValue(value);
  };

  return { debouncedValue, cancel, flush };
}
