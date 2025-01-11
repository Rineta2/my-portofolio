import Link from "next/link";

import { ArrowRight } from "lucide-react";

import styles from "@/components/section/portofolio/portofolio.module.scss";

export default function PortfolioHeader({ data, ref }) {
  return (
    <div className={styles.portofolio__toolbar} ref={ref}>
      <h1 className={styles.portofolio__title}>{data.title}</h1>
      <Link href={data.path} className={styles.portofolio__link}>
        {data.name}
        <ArrowRight />
      </Link>
    </div>
  );
}
