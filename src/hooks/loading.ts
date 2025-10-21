import { useEffect, useRef, useState } from "react";

export function loading(isReady: boolean, minMs = 1000) {
  const [visible, setVisible] = useState(true); // başlangıçta loading göster
  const mountedAt = useRef<number>(Date.now());

  useEffect(() => {
    if (!isReady) return; // henüz hazır değilse nothing
    const elapsed = Date.now() - mountedAt.current;
    const remaining = Math.max(0, minMs - elapsed);

    const t = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, minMs]);

  return visible;
}