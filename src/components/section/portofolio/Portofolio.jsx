import React from "react";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

import { portofolioData } from "@/components/data/Portofolio";

import { fetchProjects } from "@/utils/lib/project/FetchProject";

export default async function Portofolio() {
  const project = await fetchProjects();

  return <PortofolioContent project={project} data={portofolioData} />;
}
