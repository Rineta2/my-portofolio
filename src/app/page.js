import React, { Fragment } from "react";

import Home from "@/components/section/home/Home";

import About from "@/components/section/about/About";

import RegisterSW from "@/components/hooks/meta/RegisterSW";

import Achievement from "@/components/section/achievement/Achievement";

import Portofolio from "@/components/section/portofolio/Portofolio";

import Background from "@/components/hooks/section/home/Background";

import Articles from "@/components/section/article/Articles";

import BackgroundTop from "@/components/hooks/section/home/BackgroundTop";

import ScrollTop from "@/components/tools/scrollTop";

import "@/components/styling/globals.scss";

export default function page() {
  return (
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
  );
}
