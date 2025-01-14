"use client";
import React, { useState } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { format } from "date-fns";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

import { SearchSlash, Plus, Edit, Trash, X } from "lucide-react";

export default function YoutubeContent({ videos }) {
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    date: format(new Date(), "yyyy-MM-dd"),
  });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Create - Menambah video baru
  const handleAdd = async () => {
    try {
      const videosRef = collection(db, process.env.NEXT_PUBLIC_API_VIDEOS);
      await addDoc(videosRef, {
        ...newVideo,
        date: new Date(newVideo.date),
        createdAt: new Date(),
      });
      setNewVideo({
        title: "",
        url: "",
        date: format(new Date(), "yyyy-MM-dd"),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Update - Mengupdate video
  const handleUpdate = async () => {
    try {
      const videoRef = doc(db, process.env.NEXT_PUBLIC_API_VIDEOS, editId);
      await updateDoc(videoRef, {
        ...newVideo,
      });
      setIsEditing(false);
      setEditId(null);
      setNewVideo({
        title: "",
        url: "",
        date: format(new Date(), "yyyy-MM-dd"),
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Delete - Menghapus video
  const handleDelete = async (id) => {
    try {
      const videoRef = doc(db, process.env.NEXT_PUBLIC_API_VIDEOS, id);
      await deleteDoc(videoRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
    setShowModal(false);
  };

  const openModal = (video = null) => {
    if (video) {
      setIsEditing(true);
      setEditId(video.id);
      setNewVideo({
        title: video.title,
        url: video.url,
        date: format(new Date(video.date), "yyyy-MM-dd"),
      });
    } else {
      setIsEditing(false);
      setNewVideo({
        title: "",
        url: "",
        date: format(new Date(), "yyyy-MM-dd"),
      });
    }
    setShowModal(true);
  };

  console.log(videos);

  return (
    <section className={styles.youtube}>
      <div className={`${styles.youtube__container} container`}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <h1>Youtube Management</h1>

            <div className={styles.search}>
              <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchSlash />
            </div>
          </div>

          <button className={styles.addButton} onClick={() => openModal()}>
            <Plus />
            Add Video
          </button>
        </div>

        <div className={styles.videosList}>
          {videos.map((item, index) => {
            return (
              <div className={styles.box} key={index}>
                <h3>{item.title}</h3>
                <p>{item.url}</p>
                <div className={styles.actions}>
                  <button onClick={() => openModal(item)}>
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>{isEditing ? "Edit Video" : "Add New Video"}</h2>
                <button onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Video Title"
                    value={newVideo.title}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="url">URL</label>
                  <input
                    id="url"
                    type="text"
                    placeholder="Video URL"
                    value={newVideo.url}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, url: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    value={newVideo.date}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit">{isEditing ? "Update" : "Add"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
