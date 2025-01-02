export const revalidate = 0;

import React from "react";

import { fetchProjects } from "@/utils/lib/project/FetchProject";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

import { portofolioData } from "@/components/data/Portofolio";

export default async function Portofolio() {
  const project = await fetchProjects();

  return <PortofolioContent project={project} data={portofolioData} />;
}
