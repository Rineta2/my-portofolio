import PortofolioContent from "@/components/hooks/pages/portofolio/PortofolioContent"

import styles from "@/app/portofolio/Portofolio.module.scss";

export async function generateMetadata() {
    return {
        title: `Portofolio - Rizki Ramadhan`,
        description: `Portofolio Content`,
    };
}

export default async function Portofolio() {

    return (
        <section className={styles.portofolio}>
            <PortofolioContent />
        </section>
    )
}
