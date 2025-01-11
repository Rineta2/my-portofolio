import React from "react";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

import { portofolioData } from "@/components/data/Portofolio";

import { fetchProjects } from "@/utils/lib/project/FetchProject";

import { unstable_noStore as noStore } from "next/cache";

export default async function Portofolio() {
  noStore();

  const project = await fetchProjects();

  return <PortofolioContent project={project} data={portofolioData} />;
}
