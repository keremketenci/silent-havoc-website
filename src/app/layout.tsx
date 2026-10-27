// The real root layout (with <html> and <body>) lives in app/[locale]/layout.tsx.
// This pass-through layout only exists so that app/not-found.tsx can render
// for requests that don't match any locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
