import React from "react";

import moment from "moment";

import styles from "@/components/hooks/admin/dashboard/Card.module.scss";

export function Calendar({ date, setDate }) {
  const getDaysInMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = moment([year, month, 1]);
    const lastDay = moment(firstDay).endOf("month");

    const days = [];
    let currentDay = firstDay;

    while (currentDay <= lastDay) {
      days.push(moment(currentDay));
      currentDay = moment(currentDay).add(1, "days");
    }

    return days;
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarHeader}>
        <button
          onClick={() => setDate(moment(date).subtract(1, "month").toDate())}
          className={styles.calendarNavBtn}
        >
          &lt;
        </button>
        <h3 className={styles.monthTitle}>
          {moment(date).format("MMMM YYYY")}
        </h3>
        <button
          onClick={() => setDate(moment(date).add(1, "month").toDate())}
          className={styles.calendarNavBtn}
        >
          &gt;
        </button>
      </div>

      <div className={styles.calendarDaysHeader}>
        {moment.weekdaysShort(true).map((day) => (
          <div key={day} className={styles.calendarDayName}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {getDaysInMonth().map((day, index) => {
          const isToday = day.isSame(moment(), "day");
          const isCurrentMonth = day.month() === date.getMonth();

          return (
            <div
              key={index}
              className={`${styles.calendarDay} ${
                isToday ? styles.today : ""
              } ${isCurrentMonth ? "" : styles.otherMonth}`}
            >
              <span className={styles.dayNumber}>{day.format("D")}</span>
              <span className={styles.dayName}>{day.format("ddd")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
