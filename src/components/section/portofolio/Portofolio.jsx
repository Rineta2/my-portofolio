export const revalidate = 0;

import React from "react";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

import { fetchProjects } from "@/utils/lib/project/FetchProject";

import { portofolioData } from "@/components/data/Portofolio";

export default async function Portofolio() {
  const projects = await fetchProjects();

  return <PortofolioContent project={projects} data={portofolioData} revalidate={revalidate} />;
}
