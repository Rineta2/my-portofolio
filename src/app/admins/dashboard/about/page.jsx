"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import Image from "next/image";

import Link from "next/link";

import styles from "@/app/admins/layout.module.scss";

export default function About() {
  const [aboutList, setAboutList] = useState([]);

  // Mengambil data dari Firebase
  const fetchAbout = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_API_ABOUT)
      );
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAboutList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_ABOUT, id));
      fetchAbout();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <section className={styles.about}>
      <div className={`${styles.about__container} ${styles.container}`}>
        <div className={styles.toolbar}>
          <h1>About Us</h1>
          <Link href="/admins/dashboard/about/form">Tambah About</Link>
        </div>

        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Description 2</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutList.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={100}
                        height={100}
                        className={styles.table__image}
                      />
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.description2}</td>
                  <td className={styles.table__actions}>
                    <Link
                      href={`/admins/dashboard/about/form?id=${item.id}`}
                      className={styles.table__actions__edit}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={styles.table__actions__delete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
