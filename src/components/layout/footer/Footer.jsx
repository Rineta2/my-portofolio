import React from 'react'

import styles from "@/components/layout/footer/footer.module.scss";

import { footer_copyright, footer_social } from "@/components/data/Header"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container} ${styles.container}`}>
        <h1>Ready to build?</h1>

        <div className={`${styles.footer__social}`}>
          {
            footer_social.map((item, index) => {
              return (
                <Link key={index} href={item.path}>{item.icons}</Link>
              )
            })
          }
        </div>

        {
          footer_copyright.map((item, index) => {
            return (
              <p key={index}>{item.name}</p>
            )
          })
        }
      </div>
    </footer>
  )
}
