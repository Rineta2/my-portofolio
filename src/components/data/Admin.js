import {
  Users,
  Briefcase,
  Award,
  LayoutDashboard,
  Newspaper,
  Mail,
  Home,
  CircleUserRound,
  Youtube,
  Settings,
} from "lucide-react";

import { SiSkillshare } from "react-icons/si";

export const navbar = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admins/dashboard",
    icon: <LayoutDashboard />,
  },

  {
    id: 2,
    name: "About",
    icon: <CircleUserRound />,
    path: "/admins/dashboard/about",
  },

  {
    id: 3,
    name: "Achievement",
    icon: <Award />,
    path: "/admins/dashboard/achievement",
  },

  {
    id: 4,
    name: "Skills",
    icon: <SiSkillshare />,
    path: "/admins/dashboard/skills",
  },

  {
    id: 5,
    name: "Youtube",
    icon: <Youtube />,
    submenu: [
      {
        id: 1,
        name: "Youtube",
        path: "/admins/dashboard/youtube",
      },

      {
        id: 2,
        name: "Category",
        path: "/admins/dashboard/youtube/category",
      },

      {
        id: 3,
        name: "Tech Stack",
        path: "/admins/dashboard/youtube/tech-stack",
      },
    ],
  },

  {
    id: 6,
    name: "Project",
    icon: <Briefcase />,
    submenu: [
      {
        id: 1,
        name: "Project",
        path: "/admins/dashboard/project",
      },

      {
        id: 2,
        name: "Category",
        path: "/admins/dashboard/project/category",
      },

      {
        id: 3,
        name: "Tech Stack",
        path: "/admins/dashboard/project/tech-stack",
      },
    ],
  },

  {
    id: 7,
    name: "Article",
    icon: <Newspaper />,
    submenu: [
      {
        id: 1,
        name: "Article",
        path: "/admins/dashboard/article",
      },

      {
        id: 2,
        name: "Category",
        path: "/admins/dashboard/article/category",
      },

      {
        id: 3,
        name: "Tags",
        path: "/admins/dashboard/article/tags",
      },
    ],
  },

  {
    id: 8,
    name: "Users",
    icon: <Users />,
    submenu: [
      {
        id: 1,
        name: "Users",
        path: "/admins/dashboard/users",
      },

      {
        id: 2,
        name: "Comments",
        path: "/admins/dashboard/users/comments",
      },
    ],
  },

  {
    id: 9,
    name: "Contact",
    icon: <Mail />,
    path: "/admins/dashboard/contact",
  },

  {
    id: 10,
    name: "Settings",
    icon: <Settings />,
    path: "/admins/dashboard/settings",
  },

  {
    id: 11,
    name: "Homepage",
    icon: <Home />,
    path: "/",
  },
];
