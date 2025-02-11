"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/header/Header";

import Footer from "@/components/layout/footer/Footer";

import { Toaster } from "react-hot-toast";

import ScrollTop from "@/components/helpers/scrollTop";

import { useLoadingState } from "@/components/hooks/animation/loading/useLoadingState";

import Loading from "@/components/hooks/animation/loading/Loading";

const Pathname = ({ children }) => {
  const pathname = usePathname();

  const isDashboard = pathname.includes("dashboard");

  const { isLoading } = useLoadingState();

  return (
    <main>
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
      {!isDashboard && <ScrollTop />}
      {!isDashboard && <Header />}
      {isLoading ? <Loading /> : children}
      {!isDashboard && <Footer />}
    </main>
  );
};

export default Pathname;
