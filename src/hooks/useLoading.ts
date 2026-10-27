import { useEffect, useState } from "react";

// Keeps the loading overlay visible for `minMs` after mount
export function useLoading(minMs = 1000) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), minMs);
    return () => clearTimeout(t);
  }, [minMs]);

  return visible;
}
