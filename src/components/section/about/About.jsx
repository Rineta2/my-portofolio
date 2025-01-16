import AboutClient from "@/components/hooks/section/about/AboutClient";

import { fetchAbout } from "@/utils/lib/about/FetchAbout";

import { fetchSkills } from "@/utils/lib/skills/FetchSkills";

export default async function About() {
  const about = await fetchAbout();

  const skills = await fetchSkills();

  return <AboutClient about={about} skills={skills} />;
}
