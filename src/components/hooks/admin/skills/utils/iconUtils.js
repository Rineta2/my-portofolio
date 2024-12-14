import * as Fa from "react-icons/fa";
import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import * as Hi from "react-icons/hi";
import * as Si from "react-icons/si";
import * as Io from "react-icons/io";
import * as Ri from "react-icons/ri";
import * as Di from "react-icons/di";
import * as Io5 from "react-icons/io5";

export const getIconComponent = (iconName) => {
  const iconLibraries = { Fa, Ai, Bs, Hi, Si, Io, Ri, Di, Io5 };
  for (const library in iconLibraries) {
    if (iconLibraries[library][iconName]) {
      return iconLibraries[library][iconName];
    }
  }
  return null;
};