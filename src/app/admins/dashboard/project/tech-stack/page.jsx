import React from "react";

import TechStackContent from "@/components/hooks/admin/project/techstack/TechStackContent";

import { getIcons } from "@/components/hooks/admin/project/techstack/utils/useFetchTech";

export async function generateMetadata() {
  return {
    title: `Tech Stack Management`,
    description: `Manage tech stack section content and settings`,
  };
}

export default async function TechStack() {
  const icons = await getIcons();

  return <TechStackContent icons={icons} />;
}
