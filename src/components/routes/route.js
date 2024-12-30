import React, { Fragment, Suspense } from "react";

import RegisterSW from "@/components/hooks/meta/RegisterSW";

import BackgroundTop from "@/components/hooks/section/home/BackgroundTop";

import Home from "@/components/section/home/Home";

import Background from "@/components/hooks/section/home/Background";

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
        <BackgroundTop />
        <Home />
        <Background />
        <About />
        <Achievement />
        <Portofolio />
        <Articles />
        <ScrollTop />
      </Fragment>
    </Suspense>
  );
}
