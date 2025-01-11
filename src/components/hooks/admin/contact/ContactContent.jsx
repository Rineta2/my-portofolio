import React from "react";

import styles from "@/components/hooks/admin/contact/contact.module.scss";

export default function ContactContent({ contact }) {
  return (
    <section className={styles.contact__container}>
      <div className={`${styles.contact__container} container`}>
        <div className={styles.heading}>
          <h1>Contact</h1>
        </div>

        <div className={styles.content}>
          {contact.map((item, index) => {
            return (
              <div className="box" key={index}>
                <h3>{item.name}</h3>
                <span>{item.email}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
