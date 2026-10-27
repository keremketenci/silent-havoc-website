// Shared by the navbar and the footer. `key` is looked up under `<Namespace>.Link.<key>`.
export const menuItems = [
  { key: "home", href: "/" },
  { key: "team", href: "/team" },
  { key: "joinUs", href: "/join-us#JoinUs" },
  { key: "contact", href: "/contact#Contact" },
  { key: "rules", href: "/rules#Rules" },
  { key: "blog", href: "/blog" },
] as const;
