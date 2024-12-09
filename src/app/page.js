import React, { Fragment } from "react";

import Home from "@/components/section/home/Home";

import About from "@/components/section/about/About";

export default function page() {
  return (
    <Fragment>
      <Home />
      <About />
    </Fragment>
  );
}
