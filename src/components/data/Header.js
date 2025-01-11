import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  House,
  Briefcase,
  Newspaper,
  MessageCircleCode,
} from "lucide-react";

import { FaTiktok } from "react-icons/fa";

export const logoName = {
  name: "R",
  path: "/",
};

export const navLink = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: <House />,
  },

  {
    id: 2,
    name: "Portofolio",
    path: "/portofolio",
    icon: <Briefcase />,
  },

  {
    id: 3,
    name: "Articles",
    path: "/articles",
    icon: <Newspaper />,
  },

  {
    id: 4,
    name: "Contact",
    path: "/contact",
    icon: <MessageCircleCode />,
  },
];

export const footer_copyright = [
  {
    id: 1,
    name: "© 2024 by Rizki Ramadhan 👾",
  },
];

export const footer_social = [
  {
    id: 1,
    icons: <Facebook />,
    path: "",
  },

  {
    id: 2,
    icons: <Instagram />,
    path: "",
  },

  {
    id: 3,
    icons: <Linkedin />,
    path: "",
  },

  {
    id: 4,
    icons: <Youtube />,
    path: "",
  },

  {
    id: 5,
    icons: <Github />,
    path: "",
  },

  {
    id: 6,
    icons: <FaTiktok />,
    path: "",
  },
];
