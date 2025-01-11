import * as THREE from "three";

export function initUserCardBackground(element) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    element.clientWidth / element.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(element.clientWidth, element.clientHeight);
  element.appendChild(renderer.domElement);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  const posArray = new Float32Array(particlesCount * 3);

  // Fill with random positions
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  // Create gradient material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.008,
    transparent: true,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    sizeAttenuation: true,
  });

  // Add colors to particles
  const colors = new Float32Array(particlesCount * 3);
  const color1 = new THREE.Color(0x4f46e5); // Indigo
  const color2 = new THREE.Color(0x7c3aed); // Violet

  for (let i = 0; i < particlesCount; i++) {
    const mixedColor = color1.clone().lerp(color2, Math.random());
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Create particle system
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Adjust camera position and FOV
  camera.position.z = 2;
  camera.fov = 60;
  camera.updateProjectionMatrix();

  let mouseX = 0;
  let mouseY = 0;

  const handleMouseMove = (event) => {
    const rect = element.getBoundingClientRect();
    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const handleResize = () => {
    camera.aspect = element.clientWidth / element.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(element.clientWidth, element.clientHeight);
  };

  element.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.002;
    particlesMesh.rotation.x += 0.001;
    particlesMesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    particlesMesh.rotation.x +=
      (mouseY * 0.2 - particlesMesh.rotation.x) * 0.05;
    particlesMesh.rotation.y +=
      (mouseX * 0.2 - particlesMesh.rotation.y) * 0.05;
    renderer.render(scene, camera);
  }

  animate();

  // Return cleanup function
  return () => {
    element?.removeChild(renderer.domElement);
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    renderer.dispose();
    window.removeEventListener("resize", handleResize);
    element?.removeEventListener("mousemove", handleMouseMove);
  };
}
