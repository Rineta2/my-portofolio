import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/utils/theme/ThemeContext";

const Background = () => {
  const mountRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const mountNode = mountRef.current;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(isDarkMode ? 0x0a192f : 0xffffff, 0);
    mountNode.appendChild(renderer.domElement);

    // Buat geometri partikel dengan jumlah lebih banyak
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 12000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount);
    const oscillationArray = new Float32Array(particlesCount);

    // Posisi awal partikel
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
      velocityArray[i / 3] = Math.random() * 0.01 + 0.005;
      oscillationArray[i / 3] = Math.random() * Math.PI * 2;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Material partikel yang disesuaikan dengan tema
    const particlesMaterial = new THREE.PointsMaterial({
      size: isDarkMode ? 0.002 : 0.003,
      color: isDarkMode ? 0xffffff : 0x000000,
      transparent: true,
      opacity: isDarkMode ? 0.4 : 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Tambahkan geometri dan material untuk meteor
    const meteorGeometry = new THREE.BufferGeometry();
    const meteorCount = 20;
    const meteorPositions = new Float32Array(meteorCount * 3);
    const meteorVelocities = new Float32Array(meteorCount * 3);

    // Inisialisasi posisi dan kecepatan meteor
    for (let i = 0; i < meteorCount * 3; i += 3) {
      // Posisi awal di atas layar dengan posisi x dan z random
      meteorPositions[i] = (Math.random() - 0.5) * 20; // x
      meteorPositions[i + 1] = 10; // y
      meteorPositions[i + 2] = (Math.random() - 0.5) * 20; // z

      // Kecepatan diagonal ke bawah
      meteorVelocities[i] = -0.02 - Math.random() * 0.01; // x velocity
      meteorVelocities[i + 1] = -0.05 - Math.random() * 0.02; // y velocity
      meteorVelocities[i + 2] = 0; // z velocity
    }

    meteorGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(meteorPositions, 3)
    );

    // Material untuk meteor
    const meteorMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: isDarkMode ? 0x64ffda : 0x0a192f,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const meteorMesh = new THREE.Points(meteorGeometry, meteorMaterial);
    scene.add(meteorMesh);

    camera.position.z = 2;

    // Animation dengan efek salju yang lebih smooth
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.0001;

      // Update meteor positions
      const meteorPositions = meteorGeometry.attributes.position.array;
      for (let i = 0; i < meteorPositions.length; i += 3) {
        // Update posisi berdasarkan kecepatan
        meteorPositions[i] += meteorVelocities[i];
        meteorPositions[i + 1] += meteorVelocities[i + 1];
        meteorPositions[i + 2] += meteorVelocities[i + 2];

        // Reset meteor jika keluar dari view
        if (meteorPositions[i + 1] < -10) {
          meteorPositions[i] = (Math.random() - 0.5) * 20;
          meteorPositions[i + 1] = 10;
          meteorPositions[i + 2] = (Math.random() - 0.5) * 20;
        }
      }
      meteorGeometry.attributes.position.needsUpdate = true;

      // Update particle positions
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const idx = i / 3;

        // Simplified oscillation calculations - removed redundant oscillation variable
        positions[i + 1] -= velocityArray[idx] * 0.5;

        if (positions[i + 1] < -7.5) {
          positions[i + 1] = 7.5;
          positions[i] = (Math.random() - 0.5) * 15;
          positions[i + 2] = (Math.random() - 0.5) * 15;
        }

        // Combined sine/cosine movements
        positions[i] +=
          Math.sin(time * 2 + oscillationArray[idx]) * 0.0015 +
          Math.cos(time + idx) * 0.0005;
        positions[i + 2] +=
          Math.cos(time * 2 + oscillationArray[idx]) * 0.0015 +
          Math.sin(time + idx) * 0.0005;
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      particlesMesh.rotation.y += 0.00005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (
        mountNode &&
        renderer.domElement &&
        mountNode.contains(renderer.domElement)
      ) {
        mountNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      meteorGeometry.dispose();
      meteorMaterial.dispose();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default Background;
