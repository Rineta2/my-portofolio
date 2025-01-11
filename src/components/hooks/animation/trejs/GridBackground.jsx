import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GridBackground = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const frameRef = useRef(null);
    const initialAnimationRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const homeSection = container.closest('section');

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        sceneRef.current = { scene, camera, renderer };
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Calculate grid dimensions based on screen size
        const aspectRatio = window.innerWidth / window.innerHeight;
        const gridSizeY = 20;
        const gridSizeX = Math.ceil(gridSizeY * aspectRatio);
        const spacing = 1;
        const gridLines = [];

        // Create horizontal grid lines
        const numHorizontalLines = Math.ceil((window.innerHeight / 40)); // Adjust density
        for (let i = -numHorizontalLines; i <= numHorizontalLines; i++) {
            const points = [];
            points.push(new THREE.Vector3(-gridSizeX * spacing, i * spacing, 0));
            points.push(new THREE.Vector3(gridSizeX * spacing, i * spacing, 0));

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: '#8e9bae', // Ubah warna menjadi abu-abu medium
                transparent: true,
                opacity: 0.2, // Sedikit tingkatkan opacity
                blending: THREE.AdditiveBlending,
            });

            const line = new THREE.Line(geometry, material);
            line.scale.set(0, 0, 0);
            gridLines.push(line);
            scene.add(line);
        }

        // Create vertical grid lines
        const numVerticalLines = Math.ceil((window.innerWidth / 40)); // Adjust density
        for (let i = -numVerticalLines; i <= numVerticalLines; i++) {
            const points = [];
            points.push(new THREE.Vector3(i * spacing, -gridSizeY * spacing, 0));
            points.push(new THREE.Vector3(i * spacing, gridSizeY * spacing, 0));

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: '#8e9bae', // Ubah warna menjadi abu-abu medium
                transparent: true,
                opacity: 0.2, // Sedikit tingkatkan opacity
                blending: THREE.AdditiveBlending,
            });

            const line = new THREE.Line(geometry, material);
            line.scale.set(0, 0, 0);
            gridLines.push(line);
            scene.add(line);
        }

        // Adjust camera position based on screen size
        const cameraZ = Math.max(35, (window.innerWidth / window.innerHeight) * 20);
        camera.position.z = cameraZ;

        // Updated scroll handler
        const handleScroll = () => {
            if (!homeSection) return;

            const rect = homeSection.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Calculate how far we've scrolled through the section
            let scrollProgress;

            if (sectionTop > 0) {
                // Section hasn't been scrolled to yet
                scrollProgress = 0;
            } else if (sectionTop <= 0 && sectionTop > -sectionHeight) {
                // We're currently scrolling through the section
                scrollProgress = Math.abs(sectionTop) / sectionHeight;
            } else {
                // We've scrolled past the section
                scrollProgress = 1;
            }

            // Apply transformations based on scroll progress
            if (sceneRef.current) {
                const { scene, camera } = sceneRef.current;

                // Rotate the scene
                scene.rotation.x = scrollProgress * 0.5; // Increased rotation effect
                scene.rotation.y = scrollProgress * 0.3; // Increased rotation effect

                // Move camera
                camera.position.y = -scrollProgress * 5; // Increased movement

                // Update opacity of grid lines
                scene.children.forEach(child => {
                    if (child.type === 'Line') {
                        child.material.opacity = Math.max(0.15 - scrollProgress * 0.15, 0);
                    }
                });
            }
        };

        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);
            initialAnimationRef.current += 0.02;

            // Animate grid lines with stagger
            gridLines.forEach((line, i) => {
                const delay = i * 0.01;
                if (initialAnimationRef.current > delay) {
                    const scale = Math.min(
                        1,
                        1 - Math.exp(-initialAnimationRef.current + delay)
                    );
                    line.scale.set(scale, scale, scale);
                }
            });

            renderer.render(scene, camera);
        };

        // Enhanced resize handler
        const handleResize = () => {
            const newAspectRatio = window.innerWidth / window.innerHeight;
            camera.aspect = newAspectRatio;
            camera.position.z = Math.max(35, (window.innerWidth / window.innerHeight) * 20);
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        // Make sure to call handleScroll initially
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            gridLines.forEach(line => {
                line.geometry.dispose();
                line.material.dispose();
            });
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default GridBackground;
