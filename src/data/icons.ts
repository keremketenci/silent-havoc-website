// Icon name -> public path. Used by <Icon name="..." />
export const icons = {
  emptyBlack: "/icons/emptyBlack.svg",
  instagram: "/icons/socials/instagram.svg",
  instagram2: "/icons/socials/instagram2.svg",
  github: "/icons/socials/github.svg",
  github2: "/icons/socials/github2.svg",
  linkedin: "/icons/socials/linkedin.svg",
  linkedin2: "/icons/socials/linkedin2.svg",
  mail2: "/icons/socials/mail2.svg",
  patreon: "/icons/socials/patreon.svg",
  itchio: "/icons/socials/itchio.svg",
  artstation: "/icons/socials/artstation.svg",
  discord: "/icons/socials/discord.svg",
  youtube: "/icons/socials/youtube.svg",
  x: "/icons/socials/x.svg",
  facebook: "/icons/socials/facebook.svg",
  tr: "/icons/languages/tr.svg",
  en: "/icons/languages/en.svg",
  logoBlack: "/icons/silenthavoc/logo-black.svg",
  logoGray: "/icons/silenthavoc/logo-gray.svg",
  logoBlur: "/icons/silenthavoc/logo-editted-blur.svg",
  clock: "/icons/clock.svg",
  loading: "/icons/loading.svg",
} as const;

export type IconName = keyof typeof icons;
