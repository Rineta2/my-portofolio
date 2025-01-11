import AboutClient from "@/components/hooks/section/about/AboutClient";

import { fetchAbout } from "@/utils/lib/about/FetchAbout";

import { fetchSkills } from "@/utils/lib/skills/FetchSkills";

import { unstable_noStore as noStore } from "next/cache";

export default async function About() {
  const about = await fetchAbout();

  const skills = await fetchSkills();

  noStore();

  return <AboutClient about={about} skills={skills} />;
}
