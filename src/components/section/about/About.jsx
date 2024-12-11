import React from "react";

import AboutClient from "@/components/hooks/section/about/AboutClient";

import { getAbout } from "@/utils/lib/about/read_server";

import { getSkills } from "@/utils/lib/skills/read_server";

export default async function About() {
  const about = await getAbout();
  const skills = await getSkills();

  if (!about) {
    return <div>Halaman Tidak Ditemukan</div>;
  }

  return <AboutClient about={about} skills={skills} />;
}
