import React, { Fragment, Suspense } from "react";

import RegisterSW from "@/components/hooks/meta/RegisterSW";

import Home from "@/components/section/home/Home";

import About from "@/components/section/about/About";

import Achievement from "@/components/section/achievement/Achievement";

import Portofolio from "@/components/section/portofolio/Portofolio";

import Articles from "@/components/section/article/Articles";

import ScrollTop from "@/components/tools/scrollTop";

import { fetchProjects } from "@/utils/lib/project/FetchProject";

import { portofolioData } from "@/components/data/Portofolio";

export const dynamic = "force-dynamic";

export const revalidate = 10;

export default async function Route() {
  const projects = await fetchProjects();

  return (
    <Suspense>
      <Fragment>
        <RegisterSW />
        <Home />
        <About />
        <Achievement />
        <Portofolio project={projects} data={portofolioData} />
        <Articles />
        <ScrollTop />
      </Fragment>
    </Suspense>
  );
}
