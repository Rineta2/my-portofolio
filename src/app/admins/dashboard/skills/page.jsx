import React from "react";

import SkillContent from "@/components/hooks/admin/skills/SkillContent";

import { fetchSkills } from "@/components/hooks/admin/skills/utils/FetchSkills";

export async function generateMetadata() {
  return {
    title: `Skills Management`,
    description: `Manage skills section content and settings`,
  };
}

export default async function Skills() {
  const skills = await fetchSkills();

  return <SkillContent skills={skills} />;
}
