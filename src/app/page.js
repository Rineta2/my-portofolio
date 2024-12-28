import React, { Fragment } from "react";

import Home from "@/components/section/home/Home";

import About from "@/components/section/about/About";

import RegisterSW from "@/components/hooks/meta/RegisterSW";

import Achievement from "@/components/hooks/section/achievement/Achievement";

import "@/components/styling/globals.scss";

import { Toaster } from "react-hot-toast";

import Background from "@/components/hooks/section/home/Background";

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
      <Background />
      <About />
      <Achievement />
    </Fragment>
  );
}
