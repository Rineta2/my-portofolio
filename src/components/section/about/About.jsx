import React from "react";

import AboutClient from "@/components/hooks/section/about/AboutClient";

import { fetchAbout } from "@/utils/lib/about/FetchAbout";

import { fetchSkills } from "@/utils/lib/skills/FetchSkills";

export default async function About() {
  const about = await fetchAbout();
  const skills = await fetchSkills();

  if (!about) {
    return <div>Halaman Tidak Ditemukan</div>;
  }

  return <AboutClient about={about} skills={skills} />;
}
