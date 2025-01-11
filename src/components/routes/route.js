import React, { Fragment } from "react";

import Home from "@/components/section/home/Home";

import About from "@/components/section/about/About";

import Achievement from "@/components/section/achievement/Achievement";

import Portofolio from "@/components/section/portofolio/Portofolio";

import Articles from "@/components/section/article/Articles";

export default async function Route() {
  return (
    <Fragment>
      <Home />
      <About />
      <Achievement />
      <Portofolio />
      <Articles />
    </Fragment>
  );
}
