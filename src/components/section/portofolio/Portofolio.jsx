import React from "react";

import { fetchProjects } from "@/utils/lib/project/FetchProject";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

import { portofolioData } from "@/components/data/Portofolio";

export default function Portofolio({ project }) {
  return <PortofolioContent project={project} data={portofolioData} />;
}

export async function getStaticProps() {
  const project = await fetchProjects();
  return {
    props: { project },
    revalidate: 0,
  };
}
