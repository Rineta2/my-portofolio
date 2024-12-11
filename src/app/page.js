import React, { Fragment } from "react";

import Home from "@/components/section/home/Home";

import About from "@/components/section/about/About";

import RegisterSW from "@/components/hooks/meta/RegisterSW";

import "@/components/styling/globals.scss";

export default function page() {
  return (
    <Fragment>
      <RegisterSW />
      <Home />
      <About />
    </Fragment>
  );
}
