import React from "react";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

export default async function Portofolio({ project, data }) {
  return <PortofolioContent project={project} data={data} />;
}
