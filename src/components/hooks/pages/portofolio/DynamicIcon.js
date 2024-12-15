import React from "react";
import * as Fa from "react-icons/fa";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import * as Di from "react-icons/di";
import * as Md from "react-icons/md";
import * as Io from "react-icons/io";
import * as io5 from "react-icons/io5";

export const iconLibraries = { Fa, Ri, Si, Di, Md, Io, io5 };

export function DynamicIcon({ iconName }) {
  let IconComponent = null;

  try {
    for (const [prefix, library] of Object.entries(iconLibraries)) {
      if (iconName.startsWith(prefix)) {
        IconComponent = library[iconName];
        break;
      }
    }

    return IconComponent ? (
      <IconComponent size={32} />
    ) : (
      <span>Icon tidak ditemukan</span>
    );
  } catch (error) {
    console.error("Error mengambil icon:", error);
    return <span>Icon tidak ditemukan</span>;
  }
}
