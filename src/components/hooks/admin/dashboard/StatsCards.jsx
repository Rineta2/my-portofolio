import React from "react";

import {
  FaNewspaper,
  FaProjectDiagram,
  FaComments,
  FaStar,
  FaCode,
  FaTrophy,
  FaVideo,
  FaReply,
  FaEnvelope,
} from "react-icons/fa";

import styles from "@/components/hooks/admin/dashboard/Card.module.scss";

export function StatsCards({ stats }) {
  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Articles</h6>
            <h3>{stats.totalArticles}</h3>
          </div>
          <div className={styles.icons}>
            <FaNewspaper size={24} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Projects</h6>
            <h3>{stats.totalProjects}</h3>
          </div>
          <div className={styles.icons}>
            <FaProjectDiagram size={24} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Comments</h6>
            <h3>{stats.totalComments}</h3>
          </div>
          <div className={styles.icons}>
            <FaComments size={24} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Testimonials</h6>
            <h3>{stats.totalTestimonials}</h3>
          </div>
          <div className={styles.icons}>
            <FaStar size={24} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Skills</h6>
            <h3>{stats.totalSkills}</h3>
          </div>
          <div className={styles.icons}>
            <FaCode size={24} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Achievements</h6>
            <h3>{stats.totalAchievements}</h3>
          </div>
          <div className={styles.icons}>
            <FaTrophy size={24} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Videos</h6>
            <h3>{stats.totalVideos}</h3>
          </div>
          <div className={styles.icons}>
            <FaVideo size={24} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Replies</h6>
            <h3>{stats.totalReplies}</h3>
          </div>
          <div className={styles.icons}>
            <FaReply size={24} />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.text}>
            <h6>Total Contacts</h6>
            <h3>{stats.totalContacts}</h3>
          </div>
          <div className={styles.icons}>
            <FaEnvelope size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
