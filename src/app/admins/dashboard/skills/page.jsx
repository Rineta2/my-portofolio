'use client';
import { useEffect, useState } from 'react';

import { db } from '@/utils/firebase';

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import Link from "next/link";

import styles from "@/app/admins/layout.module.scss";

import { FaPlus } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import * as Fa from 'react-icons/fa';
import * as Ai from 'react-icons/ai';
import * as Bs from 'react-icons/bs';
import * as Hi from 'react-icons/hi';
import * as Si from 'react-icons/si';
import * as Io from 'react-icons/io';
import * as Ri from 'react-icons/ri';
import * as Di from 'react-icons/di';
import * as Io5 from 'react-icons/io5';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "skills"));
        const skillsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus skill ini?')) {
      try {
        await deleteDoc(doc(db, "skills", id));
        setSkills(skills.filter(skill => skill.id !== id));
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
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

  const filteredSkills = skills.filter(skill =>
    skill.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menghitung total halaman
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);

  // Mendapatkan data untuk halaman saat ini
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSkills.slice(startIndex, endIndex);
  };

  return (
    <section className={styles.skills}>
      <div className={styles.skills__container}>
        <div className={styles.toolbar}>
          <div className={styles.heading}>
            <h1>Skills</h1>

            <input
              type="text"
              placeholder="Cari skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.toolbarActions}>

            <Link href="/admins/dashboard/skills/form">
              <FaPlus /> Tambah Skills
            </Link>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Icon</th>
                <th>Title</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((skill, index) => {
                const IconComponent = getIconComponent(skill.icon);
                return (
                  <tr key={skill.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{IconComponent && <IconComponent size={24} />}</td>
                    <td>{skill.title}</td>
                    <td>
                      <div className={styles.listItem__actions}>
                        <Link href={`/admins/dashboard/skills/form?id=${skill.id}`}>
                          <AiOutlineEdit className={styles.editIcon} size={24} />
                        </Link>
                        <button onClick={() => handleDelete(skill.id)}>
                          <BsTrash className={styles.deleteIcon} size={24} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>
              Page {currentPage} of {totalPages}
            </span>

            <div className={styles.pagination__controls}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

