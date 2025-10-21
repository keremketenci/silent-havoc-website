"use client";

import React, { useEffect, useState } from "react";
import { loading } from "@/hooks/loading";
import {Loading} from "./Loading";

export default function AppLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fakeLoad = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(fakeLoad);
  }, []);

  const visible = loading(isReady, 1000);

  return (
    <>
      {visible && <Loading text="Loading" />}
      <div style={{ visibility: visible ? "hidden" : "visible" }}>{children}</div>
    </>
  );
}