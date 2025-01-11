"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/header/Header";

import Footer from "@/components/layout/footer/Footer";

import { Toaster } from "react-hot-toast";

import ScrollTop from "@/components/tools/scrollTop";

const Pathname = ({ children }) => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");

  return (
    <>
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
      <main>
        {isDashboard && <ScrollTop />}
        {!isDashboard && <Header />}
        {children}
        {!isDashboard && <Footer />}
      </main>
    </>
  );
};

export default Pathname;
