import React from "react";

import { Line } from "react-chartjs-2";

import styles from "@/components/hooks/admin/dashboard/Card.module.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export function DashboardCharts({ stats }) {
  const articleChartData = {
    labels: stats?.articleStats?.map(([category]) => category) || [],
    datasets: [
      {
        label: "Articles by Category",
        data: stats?.articleStats?.map(([, count]) => count) || [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const projectChartData = {
    labels: stats?.projectStats?.map((item) => item.name) || [],
    datasets: [
      {
        label: "Recent Projects",
        data: stats?.projectStats?.map((item) => item.count) || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const skillChartData = {
    labels: stats?.skillStats?.map((item) => item.name) || [],
    datasets: [
      {
        label: "Recent Skills",
        data: stats?.skillStats?.map((item) => item.count) || [],
        fill: false,
        borderColor: "rgb(255, 159, 64)",
        tension: 0.1,
      },
    ],
  };

  const videoChartData = {
    labels: stats?.videoStats?.map(([category]) => category) || [],
    datasets: [
      {
        label: "Videos by Category",
        data: stats?.videoStats?.map(([, count]) => count) || [],
        fill: false,
        borderColor: "rgb(153, 102, 255)",
        tension: 0.1,
      },
    ],
  };

  const contactChartData = {
    labels: stats?.contactStats?.map((item) => item.name) || [],
    datasets: [
      {
        label: "Recent Contacts",
        data: stats?.contactStats?.map((item) => item.count) || [],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#64748b",
        },
      },
      title: {
        display: true,
        text: "Articles by Category",
        font: {
          size: 16,
          family: "'Inter', sans-serif",
          weight: 600,
        },
        color: "#1e293b",
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value) => `${value}`,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#64748b",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#64748b",
        },
      },
    },
  };

  const productChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Recent Projects",
      },
    },
  };

  const skillChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Recent Skills",
      },
    },
  };

  const videoChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Videos by Category",
      },
    },
  };

  return (
    <div className={styles.charts}>
      <div className={styles.chart}>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <div className={styles.chartContent}>
              <Line data={articleChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <div className={styles.chartContent}>
              <Line data={projectChartData} options={productChartOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <div className={styles.chartContent}>
              <Line data={skillChartData} options={skillChartOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <div className={styles.chartContent}>
              <Line data={videoChartData} options={videoChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
