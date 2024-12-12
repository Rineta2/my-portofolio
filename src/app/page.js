import React, { Fragment } from "react";

import Home from "@/components/section/home/Home";

import About from "@/components/section/about/About";

import RegisterSW from "@/components/hooks/meta/RegisterSW";

import "@/components/styling/globals.scss";

import { Toaster } from "react-hot-toast";

export default function page() {
  return (
    <Fragment>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <RegisterSW />
      <Home />
      <About />
    </Fragment>
  );
}
