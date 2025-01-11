import { LayoutDashboard, Newspaper, Mail, Home, Settings } from "lucide-react";

export const navbar = [
  {
    id: 1,
    name: "Dashboard",
    path: "/users/dashboard",
    icon: <LayoutDashboard size={32} />,
  },

  {
    id: 2,
    name: "Article",
    path: "/users/dashboard/article",
    icon: <Newspaper size={32} />,
  },

  {
    id: 3,
    name: "Contact",
    icon: <Mail size={32} />,
    path: "/users/dashboard/contact",
  },

  {
    id: 4,
    name: "Settings",
    icon: <Settings size={32} />,
    path: "/users/dashboard/settings",
  },

  {
    id: 5,
    name: "Homepage",
    icon: <Home size={32} />,
    path: "/",
  },
];
