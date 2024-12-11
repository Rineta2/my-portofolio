'use client';
import { useEffect, useState } from 'react';
import SkillsTable from "@/components/hooks/admin/skills/SkillsTable";
import Toolbar from "@/components/hooks/admin/skills/Toolbar";
import { fetchSkills, deleteSkill } from "@/components/hooks/admin/skills/utils/skillsService";
import styles from "@/app/admins/layout.module.scss";

export default function SkillsContent() {
    const [skills, setSkills] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadSkills = async () => {
            const skillsData = await fetchSkills();
            setSkills(skillsData);
        };
        loadSkills();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus skill ini?')) {
            await deleteSkill(id);
            setSkills(skills.filter(skill => skill.id !== id));
        }
    };

    const filteredSkills = skills.filter(skill =>
        skill.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className={styles.skills}>
            <div className={styles.skills__container}>
                <Toolbar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <SkillsTable
                    skills={filteredSkills}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onDelete={handleDelete}
                />
            </div>
        </section>
    );
}