'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/utils/firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from "@/app/admins/layout.module.scss";
import * as Fa from 'react-icons/fa';
import * as Ai from 'react-icons/ai';
import * as Bs from 'react-icons/bs';
import * as Hi from 'react-icons/hi';
import * as Si from 'react-icons/si';
import * as Io from 'react-icons/io';
import * as Ri from 'react-icons/ri';
import * as Di from 'react-icons/di';
import * as Io5 from 'react-icons/io5';

import Link from 'next/link';

export default function SkillsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({
    title: '',
    icon: ''
  });

  useEffect(() => {
    if (id) {
      const fetchSkill = async () => {
        try {
          const skillDoc = await getDoc(doc(db, "skills", id));
          if (skillDoc.exists()) {
            setFormData(skillDoc.data());
          }
        } catch (error) {
          console.error('Error fetching skill:', error);
        }
      };
      fetchSkill();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update
        await updateDoc(doc(db, "skills", id), formData);
      } else {
        // Create
        await addDoc(collection(db, "skills"), formData);
      }
      router.push('/admins/dashboard/skills');
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getIconComponent = (iconName) => {
    const iconLibraries = { Fa, Ai, Bs, Hi, Si, Io, Ri, Di, Io5 };
    for (const library in iconLibraries) {
      if (iconLibraries[library][iconName]) {
        return iconLibraries[library][iconName];
      }
    }
    return null;
  };

  const IconComponent = formData.icon ? getIconComponent(formData.icon) : null;

  return (
    <section className={styles.skillsForm}>
      <div className={styles.skillsForm__container}>
        <div className={styles.toolbar}>
          <h1>{id ? 'Edit' : 'Tambah'} Skill</h1>

          <Link href="/admins/dashboard/skills">
            Kembali
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="icon">Icon (React Icon Name)</label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              required
              placeholder="Contoh: FaGithub"
            />

            {IconComponent && (
              <div className={styles.iconPreview}>
                <IconComponent size={30} />
              </div>
            )}
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={() => router.back()}>
              Batal
            </button>
            <button type="submit">
              {id ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
