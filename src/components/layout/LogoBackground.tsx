// The eye pulse animation is defined inside the SVG itself, so a plain <img>
// is enough: no client JS, no runtime fetch, no resize listener.
export function LogoBackground() {
  return (
    <div className="fixed inset-0 flex justify-center items-center pointer-events-none -z-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/silenthavoc/logo-gray.svg"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="size-[min(100vw,100vh)] object-contain"
      />
    </div>
  );
}
