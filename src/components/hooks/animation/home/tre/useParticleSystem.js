import { useEffect, useRef } from "react";

import { ParticleSystem } from "@/components/hooks/animation/home/ParticleSystem";

export function useParticleSystem(isDarkMode) {
  const canvasRef = useRef(null);
  const particleSystemRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      particleSystemRef.current = new ParticleSystem(
        canvasRef.current,
        isDarkMode
      );
    }

    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.dispose();
      }
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (particleSystemRef.current) {
      particleSystemRef.current.updateTheme(isDarkMode);
    }
  }, [isDarkMode]);

  return canvasRef;
}
