import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function useAchievement() {
  const [achievementList, setAchievementList] = useState([]);

  const fetchAchievement = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT)
      );
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAchievementList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAchievement();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT, id));
      fetchAchievement();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return { achievementList, handleDelete };
}
