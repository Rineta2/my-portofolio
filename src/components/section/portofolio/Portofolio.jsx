"use client";

import React, { useState, useEffect } from "react";

import PortofolioContent from "@/components/hooks/section/portofolio/PortofolioContent";

import { portofolioData } from "@/components/data/Portofolio";

import { subscribeToPortofolio } from "@/utils/lib/project/FetchPortofolio";

export default function Portofolio() {
  const [portofolio, setPortofolio] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToPortofolio(setPortofolio);

    return () => unsubscribe();
  }, []);

  return <PortofolioContent portofolio={portofolio} data={portofolioData} />;
}
