import React from "react";

import SkillContent from "@/components/hooks/admin/skills/SkillContent";

export async function generateMetadata() {
  return {
    title: `Skills Management`,
    description: `Manage skills section content and settings`,
  };
}

export default function Skills() {
  return <SkillContent />;
}


