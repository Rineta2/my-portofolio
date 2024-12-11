"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/components/hooks/meta/serviceWorker";

export default function RegisterSW() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
