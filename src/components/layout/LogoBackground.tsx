// The logo (with dimmed eyes) and a separate glowing-eyes layer stacked on top.
// Only the eyes layer's opacity is animated, so the browser can fade it on the
// GPU instead of repainting the whole 90 KB SVG every frame.
export function LogoBackground() {
  return (
    <div className="fixed inset-0 flex justify-center items-center pointer-events-none -z-10">
      <div className="relative size-[min(100vw,100vh)]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/silenthavoc/logo-gray.svg"
          alt=""
          decoding="async"
          className="absolute inset-0 size-full object-contain"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/silenthavoc/logo-eyes.svg"
          alt=""
          decoding="async"
          className="absolute inset-0 size-full object-contain will-change-[opacity] animate-eye-glow motion-reduce:animate-none"
        />
      </div>
    </div>
  );
}
