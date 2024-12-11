import { useState, useEffect } from "react";

import { db } from "@/utils/firebase";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function useAbout() {
  const [aboutList, setAboutList] = useState([]);

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

  return { aboutList, handleDelete };
}
