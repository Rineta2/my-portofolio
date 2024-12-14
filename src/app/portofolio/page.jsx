import { getProjects } from "@/utils/lib/project/read_server"

import PortofolioContent from "@/components/hooks/pages/portofolio/PortofolioContent"

import styles from "@/app/portofolio/Portofolio.module.scss";

export async function generateMetadata() {
    return {
        title: `Portofolio - Rizki Ramadhan`,
        description: `Portofolio Content`,
    };
}

export default async function Portofolio() {
    const project = await getProjects();

    if (!project) {
        return <div>Halaman Tidak Ditemukan</div>;
    }

    return (
        <section className={styles.portofolio}>
            <PortofolioContent project={project} />
        </section>
    )
}
