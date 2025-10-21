import { useEffect, useRef, useState } from "react";

export function useLoading(isReady: boolean, minMs = 1000) {
  const [visible, setVisible] = useState(true);
  const mountedAt = useRef<number>(Date.now());

  useEffect(() => {
    if (!isReady) return;

    const elapsed = Date.now() - mountedAt.current;
    const remaining = Math.max(0, minMs - elapsed);

    const t = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(t);
  }, [isReady, minMs]);

  return visible;
}