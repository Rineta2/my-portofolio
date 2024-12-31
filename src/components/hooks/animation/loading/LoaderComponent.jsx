import React from "react";

import Background from "@/components/hooks/animation/loading/Background";

const LoaderComponent = ({
  loaderRef,
  isLoading,
  progress,
  progressTextRef,
}) => {
  return (
    <div ref={loaderRef} className={`loader ${isLoading ? "loading" : ""}`}>
      <Background />
      <div className="loader-content">
        <h2 className="loader-title">Welcome to my portfolio</h2>
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
  );
};

export default LoaderComponent;
