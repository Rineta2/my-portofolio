import React, { Fragment, Suspense } from "react";

import RegisterSW from "@/components/hooks/meta/RegisterSW";

import Home from "@/components/section/home/Home";

import About from "@/components/section/about/About";

import Achievement from "@/components/section/achievement/Achievement";

import Portofolio from "@/components/section/portofolio/Portofolio";

import Articles from "@/components/section/article/Articles";

import ScrollTop from "@/components/tools/scrollTop";

export default function Route() {
  return (
    <Suspense>
      <Fragment>
        <RegisterSW />
        <Home />
        <About />
        <Achievement />
        <Portofolio />
        <Articles />
        <ScrollTop />
      </Fragment>
    </Suspense>
  );
}
