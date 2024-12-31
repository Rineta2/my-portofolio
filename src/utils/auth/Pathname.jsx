"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import Background from "@/components/hooks/animation/loading/Background";
import { Toaster } from "react-hot-toast";
import gsap from "gsap";

const Pathname = ({ children }) => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    window.scrollTo(0, 0);

    // Text animation
    const textTl = gsap.timeline();
    textTl.fromTo(
      ".loader-title",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );

    // Progress animation
    let progressValue = { value: 0 };
    const progressTl = gsap.timeline();

    progressTl.to(progressValue, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressValue.value));
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${Math.round(
            progressValue.value
          )}%`;
        }
      },
    });

    // Loader animation
    const loaderTl = gsap.timeline({
      delay: 2.2,
      onComplete: () => {
        setIsLoading(false);
        setProgress(100);
      },
    });

    loaderTl
      .to(".loader-content", {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(".loader", {
        height: "0%",
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      textTl.kill();
      progressTl.kill();
      loaderTl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div ref={loaderRef} className={`loader ${isLoading ? "loading" : ""}`}>
        <Background />
        <div className="loader-content">
          <h2 className="loader-title">LOADING</h2>
          <div className="progress-container">
            <div className="progress-bar-wrapper">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-text" ref={progressTextRef}>
              0%
            </span>
          </div>
        </div>
      </div>
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
