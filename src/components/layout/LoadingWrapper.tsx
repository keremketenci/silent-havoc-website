"use client";

import React from "react";
import { useLoading } from "@/hooks/useLoading";
import { Loading } from "./Loading";

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const visible = useLoading(1100);

  // The page content is always rendered and visible underneath the overlay, so
  // crawlers and the browser's paint/LCP never see an empty (hidden) page.
  return (
    <>
      {visible && <Loading text="Loading" />}
      {children}
    </>
  );
}
