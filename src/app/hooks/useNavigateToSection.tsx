"use client";

import { useRouter } from "next/navigation";

export function useNavigateToSection() {
  const router = useRouter();

  const navigateToSection = (path: string) => {
    if (path.includes("#")) {
      const [pagePath, sectionId] = path.split("#");

      if (
        window.location.pathname === pagePath ||
        (pagePath === "" && window.location.pathname === "/")
      ) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          window.history.pushState(null, "", `#${sectionId}`);
        }
      } else {
        router.push(`${pagePath || "/"}#${sectionId}`);
      }
    } else {
      router.push(path);
    }
  };

  return navigateToSection;
}
