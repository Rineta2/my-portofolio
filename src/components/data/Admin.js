import {
  Users,
  Briefcase,
  Award,
  LayoutDashboard,
  Newspaper,
  Mail,
  Home,
  CircleUserRound,
  Settings,
} from "lucide-react";

import { SiSkillshare } from "react-icons/si";

export const navbar = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admins/dashboard",
    icon: <LayoutDashboard size={32} />,
  },

  {
    id: 2,
    name: "About",
    icon: <CircleUserRound size={32} />,
    path: "/admins/dashboard/about",
  },

  {
    id: 3,
    name: "Achievement",
    icon: <Award size={32} />,
    path: "/admins/dashboard/achievement",
  },

  {
    id: 4,
    name: "Skills",
    icon: <SiSkillshare size={32} />,
    path: "/admins/dashboard/skills",
  },

  {
    id: 5,
    name: "Project",
    icon: <Briefcase size={32} />,
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
    id: 6,
    name: "Article",
    icon: <Newspaper size={32} />,
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
    id: 7,
    name: "Users",
    icon: <Users size={32} />,
    submenu: [
      {
        id: 1,
        name: "Users",
        path: "/admins/dashboard/users",
      },

      {
        id: 2,
        name: "Status",
        path: "/admins/dashboard/users/status",
      },
    ],
  },

  {
    id: 8,
    name: "Contact",
    icon: <Mail size={32} />,
    path: "/admins/dashboard/contact",
  },

  {
    id: 9,
    name: "Settings",
    icon: <Settings size={32} />,
    path: "/admins/dashboard/settings",
  },

  {
    id: 10,
    name: "Homepage",
    icon: <Home size={32} />,
    path: "/",
  },
];
