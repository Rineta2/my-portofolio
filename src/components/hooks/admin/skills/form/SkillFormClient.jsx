"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  fetchSkillById,
  saveSkill,
} from "@/components/hooks/admin/skills/form/utils/skillService";
import SkillFormComponent from "@/components/hooks/admin/skills/form/SkillFormComponents";
import styles from "@/app/admins/layout.module.scss";
import Link from "next/link";

export default function SkillsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({
    title: "",
    icon: "",
  });

  useEffect(() => {
    if (id) {
      fetchSkillById(id).then((data) => {
        if (data) setFormData(data);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveSkill(id, formData);
      router.push("/admins/dashboard/skills");
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  return (
    <section className={styles.skillsForm}>
      <div className={`${styles.skillsForm__container} container`}>
        <div className={styles.toolbar}>
          <h1>{id ? "Edit" : "Tambah"} Skill</h1>

          <Link href="/admins/dashboard/skills">Kembali</Link>
        </div>

        <SkillFormComponent
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          router={router}
        />
      </div>
    </section>
  );
}
