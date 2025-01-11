import * as THREE from "three";

export class ParticleSystem {
  constructor(canvas, isDarkMode) {
    this.canvas = canvas;
    this.isDarkMode = isDarkMode;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });

    this.init();
    this.setupParticles();
    this.animate();
    this.handleResize();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 2;
  }

  setupParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: this.isDarkMode ? "#ffffff" : "#333333",
      transparent: true,
      opacity: 0.6,
    });

    this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particlesMesh);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.particlesMesh.rotation.y += 0.001;
    this.renderer.render(this.scene, this.camera);
  };

  handleResize = () => {
    this.resizeHandler = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", this.resizeHandler);
  };

  dispose() {
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  }

  updateTheme(isDarkMode) {
    this.isDarkMode = isDarkMode;
    if (this.particlesMesh) {
      this.particlesMesh.material.color.setHex(
        isDarkMode ? 0xffffff : 0x333333
      );
    }
  }
}
