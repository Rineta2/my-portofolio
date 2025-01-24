import React, { useState } from "react";

import { Calendar } from "@/components/hooks/admin/dashboard/Calender";

import styles from "@/components/hooks/admin/dashboard/Card.module.scss";

export function DashboardHeader({ currentTime }) {
  const [calendarDate, setCalendarDate] = useState(new Date());

  return (
    <div className={styles.top}>
      <div className={styles.heading}>
        <h1>Dashboard</h1>
        <span>Selamat Datang, Admin</span>
      </div>

      <div className={styles.datetimeDisplay}>
        <div className={styles.time}>{currentTime.format("HH:mm:ss")}</div>
        <div className={styles.date}>
          <Calendar date={calendarDate} setDate={setCalendarDate} />
        </div>
      </div>
    </div>
  );
}
