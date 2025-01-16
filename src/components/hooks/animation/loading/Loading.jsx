import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

import "@/components/styling/globals.scss";

export default function Loading() {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const loadingScreenRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      if (
        !canvasRef.current ||
        !counterRef.current ||
        !progressBarRef.current ||
        !loadingScreenRef.current
      )
        return;

      document.body.style.overflow = "hidden";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.position.z = 5;

      // Buat bintang-bintang
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        sizeAttenuation: true,
      });

      const starsVertices = [];
      const velocities = [];
      for (let i = 0; i < 3000; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        starsVertices.push(x, y, z);
        velocities.push((Math.random() - 0.5) * 0.05);
      }

      starsGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starsVertices, 3)
      );
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      // Buat astronot (menggunakan simple geometri)
      const astronautGroup = new THREE.Group();

      // Badan astronot
      const bodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

      // Helm astronot
      const helmetGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const helmetMaterial = new THREE.MeshBasicMaterial({
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.7,
      });
      const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
      helmet.position.y = 0.5;

      // Ransel astronot
      const backpackGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.2);
      const backpackMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
      const backpack = new THREE.Mesh(backpackGeometry, backpackMaterial);
      backpack.position.z = -0.3;

      astronautGroup.add(body, helmet, backpack);

      // Tunggu sampai DOM elements tersedia
      setTimeout(() => {
        // Posisi awal astronot di luar tengah
        astronautGroup.position.set(-2, 0, 0);
        scene.add(astronautGroup);

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            setIsLoading(false);
          },
        });

        // Buat path untuk pergerakan astronot
        tl.to(progressBarRef.current, {
          width: "100%",
          duration: 2.5,
          onUpdate: function () {
            const progress = Math.round(this.progress() * 100);
            if (counterRef.current) {
              counterRef.current.textContent = `${progress}%`;
            }
          },
        });

        // Animasi astronot bergerak dalam lintasan
        tl.to(
          astronautGroup.position,
          {
            duration: 4,
            motionPath: {
              path: [
                { x: -2, y: 0, z: 0 }, // Start position
                { x: -1, y: 1, z: 1 }, // Point 1
                { x: 0, y: 0.5, z: -1 }, // Point 2
                { x: 1, y: -0.5, z: 1 }, // Point 3
                { x: 2, y: 0, z: 0 }, // End position
              ],
              curviness: 1.5,
            },
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          },
          "-=2.5"
        );

        // Animasi rotasi astronot selama bergerak
        tl.to(
          astronautGroup.rotation,
          {
            duration: 4,
            x: Math.PI * 2,
            y: Math.PI * 4,
            repeat: -1,
            ease: "none",
          },
          "<"
        );

        // Tambahkan animasi floating
        gsap.to(astronautGroup.position, {
          y: "+=0.2",
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });

        // Fade out loading screen
        tl.to(loadingScreenRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 1,
          onComplete: () => {
            if (loadingScreenRef.current) {
              loadingScreenRef.current.style.display = "none";
            }
            document.body.style.overflow = "auto";
            if (typeof initializeScrollReveal === "function") {
              initializeScrollReveal();
            }
          },
        });
      }, 0);

      // Mouse interaction yang lebih responsif
      const mouse = new THREE.Vector2();
      const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Tambahkan sedikit tilt ke arah mouse
        gsap.to(astronautGroup.rotation, {
          x: mouse.y * 0.2,
          z: -mouse.x * 0.2,
          duration: 0.5,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      // Animation loop dengan pergerakan yang lebih dinamis
      const animate = () => {
        requestAnimationFrame(animate);

        // Animasi bintang berkedip dan bergerak
        const positions = starsGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          // Gerakan bintang ke depan (sumbu z)
          positions[i + 2] += velocities[i / 3];

          // Reset posisi bintang jika terlalu jauh
          if (positions[i + 2] > 50) {
            positions[i + 2] = -50;
          } else if (positions[i + 2] < -50) {
            positions[i + 2] = 50;
          }
        }
        starsGeometry.attributes.position.needsUpdate = true;

        // Tambahkan efek berkedip
        starsMaterial.size = 0.1 + Math.sin(Date.now() * 0.001) * 0.03;

        renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };
      window.addEventListener("resize", handleResize);

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);

        // Cleanup
        starsGeometry.dispose();
        starsMaterial.dispose();
        bodyGeometry.dispose();
        bodyMaterial.dispose();
        helmetGeometry.dispose();
        helmetMaterial.dispose();
        backpackGeometry.dispose();
        backpackMaterial.dispose();
        renderer.dispose();
      };
    };

    // Tunggu sampai window load
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen" ref={loadingScreenRef}>
      <canvas ref={canvasRef} className="loading-canvas" />
      <div className="loading-content">
        <h2>My Portfolio</h2>
        <h3>Rizki Ramadhan</h3>
        <div className="loading-bar">
          <div className="progress-bar" ref={progressBarRef}></div>
        </div>
        <p className="loading-text">
          Loading...{" "}
          <span className="counter" ref={counterRef}>
            0%
          </span>
        </p>
      </div>
    </div>
  );
}
