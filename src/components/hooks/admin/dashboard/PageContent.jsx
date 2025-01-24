"use client";
import React, { useState, useEffect } from "react";

import moment from "moment";

import "moment/locale/id";

import { DashboardHeader } from "@/components/hooks/admin/dashboard/DashboardHeader";

import { StatsCards } from "@/components/hooks/admin/dashboard/StatsCards";

import { DashboardCharts } from "@/components/hooks/admin/dashboard/DashboardCharts";

import { useStats } from "@/components/hooks/admin/dashboard/utils/useStats";

import "@/components/hooks/admin/dashboard/Card.module.scss";

import styles from "@/components/hooks/admin/dashboard/Card.module.scss";

export default function PageContent() {
  const { stats } = useStats();
  const [currentTime, setCurrentTime] = useState(moment());

  moment.locale("id");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.home}>
      <div className={styles.homeContainer}>
        <DashboardHeader currentTime={currentTime} />
        <StatsCards stats={stats} />
      </div>

      <DashboardCharts stats={stats} />
    </section>
  );
}
