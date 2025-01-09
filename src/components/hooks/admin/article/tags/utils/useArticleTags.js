"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import { toast } from "react-hot-toast";

export const fetchTags = async (selectedCategory) => {
  try {
    let q = selectedCategory
      ? query(
          collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS),
          where("categoryId", "==", selectedCategory)
        )
      : collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS);

    const querySnapshot = await getDocs(q);
    const tagsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tagsData;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const addTag = async (newTag, selectedCategory) => {
  if (!selectedCategory) {
    toast.error("Please select a category first");
    return false;
  }
  if (!newTag.trim()) {
    toast.error("Please enter a tag name");
    return false;
  }

  try {
    await addDoc(collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS), {
      name: newTag.trim(),
      categoryId: selectedCategory,
      createdAt: new Date().toISOString(),
    });
    toast.success("Tag added successfully");
    return await fetchTags(selectedCategory);
  } catch (error) {
    console.error("Error adding tag:", error);
    toast.error("Failed to add tag");
    throw error;
  }
};

export const deleteTag = async (tagId, selectedCategory) => {
  try {
    await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS, tagId));
    return await fetchTags(selectedCategory);
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
};

export const updateTag = async (tagId, newName, selectedCategory) => {
  try {
    await updateDoc(doc(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS, tagId), {
      name: newName,
    });
    return await fetchTags(selectedCategory);
  } catch (error) {
    console.error("Error updating tag:", error);
    throw error;
  }
};

export const useArticleTags = (selectedCategory, initialTags = []) => {
  const [tags, setTags] = useState(initialTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      let q = selectedCategory
        ? query(
            collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS),
            where("categoryId", "==", selectedCategory)
          )
        : collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS);

      const querySnapshot = await getDocs(q);
      const tagsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTags(tagsData);
    };

    if (selectedCategory) {
      fetchTags();
    }
  }, [selectedCategory]);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS, tagId));
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
      toast.success("Tag deleted successfully");
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("Failed to delete tag");
    }
  };

  const handleAddTag = async (newTag, categoryId) => {
    setIsLoading(true);
    try {
      const docRef = await addDoc(
        collection(db, process.env.NEXT_PUBLIC_API_ARTICLE_TAGS),
        {
          name: newTag.trim(),
          categoryId: categoryId,
          createdAt: new Date().toISOString(),
        }
      );

      const newTagData = {
        id: docRef.id,
        name: newTag.trim(),
        categoryId: categoryId,
        createdAt: new Date().toISOString(),
      };

      setTags((prevTags) => [...prevTags, newTagData]);
      toast.success("Tag added successfully");
      return true;
    } catch (error) {
      console.error("Error adding tag:", error);
      toast.error("Failed to add tag");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tags,
    setTags,
    searchQuery,
    setSearchQuery,
    filteredTags,
    addTag: handleAddTag,
    deleteTag: handleDeleteTag,
    updateTag,
    isLoading,
  };
};
