import React from "react";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

import { portofolioData } from "@/components/data/Portofolio";

import { fetchPortofolio } from "@/utils/lib/project/FetchPortofolio";

export default async function Portofolio() {
  const portofolio = await fetchPortofolio();

  return <PortofolioContent portofolio={portofolio} data={portofolioData} />;
}
