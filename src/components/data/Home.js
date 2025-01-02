import img from "@/components/assets/home/img.webp";

import { Github, Linkedin, Instagram, Facebook } from "lucide-react";

import rocket from "@/components/assets/home/rocket.png";

import pictureBack from "@/components/assets/element/Vector_2.png";

export const home = {
  text: "Hey, I’m Rizki Ramadhan",
  title: "But you can call me Rizki",
  description:
    "I’m a graphic designer, UX/UI designer & front-end web developer",
  pictureBack: pictureBack,
};

export const homeBtn = [
  {
    id: 1,
    name: "See My Projects",
    path: "/portfolio",
  },

  {
    id: 2,
    name: "Let's me talk",
    path: "/contact",
  },
];

export const homeImg = {
  img: img,
};

export const icons = [
  {
    id: 1,
    icons: <Github />,
    path: "https://github.com/Rineta2",
  },

  {
    id: 2,
    icons: <Linkedin />,
    path: "https://www.linkedin.com/in/rizki-ramadhan12",
  },

  {
    id: 3,
    icons: <Instagram />,
    path: "https://www.instagram.com/rzkir.20",
  },

  {
    id: 4,
    icons: <Facebook />,
    path: "https://www.facebook.com/profile.php?id=100007663247764",
  },
];

export const rocketImg = {
  rocket: rocket,
};
