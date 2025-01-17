"use client";

import React, { useEffect, useRef, useState } from "react";

import * as THREE from "three";

import gsap from "gsap";

import styles from "@/components/hooks/animation/loading/loading.module.scss";

export default function Loading({ theme = "dark" }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // 'loading' | 'welcome' | 'complete'
  const progressTimeline = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Capture the current value of mountRef
    const mountElement = mountRef.current;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(150, 150);
    mountRef.current.appendChild(renderer.domElement);

    // Create modern loading spinner geometry
    const geometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffbb,
      wireframe: true,
      emissive: 0x00ffbb,
      emissiveIntensity: 0.8,
    });

    // Add lights
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const spinner = new THREE.Mesh(geometry, material);
    scene.add(spinner);

    camera.position.z = 10;

    // GSAP Animation
    gsap.to(spinner.rotation, {
      y: Math.PI * 2,
      duration: 1.5,
      repeat: -1,
      ease: "none",
    });

    // Buat timeline untuk kontrol yang lebih baik
    progressTimeline.current = gsap.timeline({
      onComplete: () => {
        // Tunggu benar-benar 100% sebelum ke fase welcome
        setTimeout(() => {
          setPhase("welcome");
          // Tunggu welcome selesai sebelum complete
          setTimeout(() => {
            setPhase("complete");
          }, 2000);
        }, 500);
      },
    });

    // Animasi progress
    progressTimeline.current.to(
      { value: 0 },
      {
        value: 100,
        duration: 5,
        ease: "none",
        onUpdate: function () {
          const value = this.targets()[0].value;
          setProgress(value);
          // Update progress bar
          const progressBar = document.querySelector(".progress-bar");
          if (progressBar) {
            progressBar.style.width = `${Math.round(value)}%`;
          }
        },
      }
    );

    // Animation function
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (progressTimeline.current) {
        progressTimeline.current.kill();
      }
    };
  }, []);

  if (phase === "complete") return null;

  return (
    <div
      className={`${styles.container} ${
        phase === "complete" ? styles.fadeOut : ""
      } ${styles[theme]}`}
    >
      <div className={styles.content}>
        <div ref={mountRef} className={styles.spinnerContainer}></div>

        {phase === "loading" ? (
          <>
            <div className={styles.progressContainer}>
              <div className={styles.progressLabel}>Loading</div>
              <div className={styles.progressBackground}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${Math.round(progress)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className={styles.progressText}>{Math.round(progress)}%</div>
          </>
        ) : (
          <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeTitle}>Welcome</h1>
            <p className={styles.welcomeText}>to my Portfolio</p>
          </div>
        )}
      </div>
    </div>
  );
}
