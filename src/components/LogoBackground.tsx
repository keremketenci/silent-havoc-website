"use client";

import { useEffect, useRef, useState } from "react";

export default function LogoBackground() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(400);

  useEffect(() => {
    // Ekran boyutuna göre logo boyunu ayarlamak
    const updateSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const newSize = Math.min(w, h) * 1;
      setSize(newSize);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    fetch("/icons/silenthavoc/logo-gray.svg")
      .then((res) => res.text())
      .then((svgText) => {
        if (logoRef.current) {
          logoRef.current.innerHTML = svgText;

          const svgEl = logoRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.setAttribute("width", size.toString());
            svgEl.setAttribute("height", size.toString());
          }

          const eye1l = logoRef.current.querySelector<SVGPathElement>("#path4");
          const eye2r =
            logoRef.current.querySelector<SVGPathElement>("#path134");

          eye1l?.classList.add("eyePulse");
          eye2r?.classList.add("eyePulse");
        }
      });
  }, [size]);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center pointer-events-none -z-10"
      ref={logoRef}
    ></div>
  );
}
