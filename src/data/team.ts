import type { IconName } from "@/data/icons";

export interface TeamMember {
  name: string;
  roleKey: string;
  inGameRoleKey: string;
  image: string;
  socials: { link: string; icon: IconName }[];
}

export const teamLeaders: TeamMember[] = [
  {
    name: "Atilla ÇİFTCİ",
    roleKey: "Roles.Team-Captain",
    inGameRoleKey: "InGame-Roles.Entry-Fragger",
    image: "/images/team/Atilla-Çiftci.jpg",
    socials: [{ link: "#", icon: "loading" }],
  },
  {
    name: "Erhan Arslan",
    roleKey: "Roles.Vice-Captain",
    inGameRoleKey: "InGame-Roles.Entry-Fragger",
    image: "/images/team/Erhan-Arslan.jpg",
    socials: [
      {
        link: "https://www.instagram.com/erhanarslan6034/",
        icon: "instagram2",
      },
    ],
  },
  {
    name: "Gürkan Keleş",
    roleKey: "Roles.Vice-Captain",
    inGameRoleKey: "InGame-Roles.Entry-Fragger",
    image: "/images/team/Gürkan-Keleş.jpg",
    socials: [
      { link: "https://www.instagram.com/sea.yeah/", icon: "instagram2" },
    ],
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Emirhan Yaman",
    roleKey: "Roles.Member",
    inGameRoleKey: "InGame-Roles.Entry-Fragger",
    image: "/images/team/Emirhan-Yaman.png",
    socials: [
      { link: "https://www.instagram.com/nacho.exe/", icon: "instagram2" },
    ],
  },
  {
    name: "Mert Can Doğan",
    roleKey: "Roles.Member",
    inGameRoleKey: "InGame-Roles.Entry-Fragger",
    image: "/images/team/Mert-Can-Doğan.png",
    socials: [
      { link: "https://www.instagram.com/ecostavakya/", icon: "instagram2" },
    ],
  },
  {
    name: "Oğuz Tonyalı",
    roleKey: "Roles.Member",
    inGameRoleKey: "InGame-Roles.Entry-Fragger",
    image: "/images/team/Oğuz-Tonyalı.jpg",
    socials: [
      { link: "https://www.instagram.com/ogz.tonyali/", icon: "instagram2" },
    ],
  },
  {
    name: "Oğuzhan Dermentepe",
    roleKey: "Roles.Member",
    inGameRoleKey: "InGame-Roles.Entry-Fragger",
    image: "/images/team/Oğuzhan-Dermentepe.jpg",
    socials: [
      {
        link: "https://www.instagram.com/oguzhandermentepe/",
        icon: "instagram2",
      },
    ],
  },
  {
    name: "Vitaly Kotelnikov",
    roleKey: "Roles.Member",
    inGameRoleKey: "InGame-Roles.Entry-Fragger",
    image: "/images/team/Vitaly-Kotelnikov.jpg",
    socials: [{ link: "#", icon: "loading" }],
  },
];
