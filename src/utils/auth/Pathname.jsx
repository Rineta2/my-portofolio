"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/header/Header";

import Footer from "@/components/layout/footer/Footer";

import { Toaster } from "react-hot-toast";

import LoaderComponent from "@/components/hooks/animation/loading/LoaderComponent";

import useLoader from "@/components/hooks/animation/loading/useLoader";

const Pathname = ({ children }) => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const { isLoading, progress, progressTextRef, loaderRef } =
    useLoader(pathname);

  return (
    <>
      <LoaderComponent
        loaderRef={loaderRef}
        isLoading={isLoading}
        progress={progress}
        progressTextRef={progressTextRef}
      />
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
      <div className="content-wrapper">
        {!isDashboard && <Header />}
        <main className={isLoading ? "loading" : ""}>{children}</main>
        {!isDashboard && <Footer />}
      </div>
    </>
  );
};

export default Pathname;
