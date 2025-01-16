import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const subscribeToSkills = (callback) => {
  const skillsRef = collection(db, process.env.NEXT_PUBLIC_API_SKILLS);
  const skillsQuery = query(skillsRef, orderBy("title"));

  // Mengembalikan fungsi unsubscribe
  return onSnapshot(skillsQuery, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      const createdAt = docData.createdAt ? docData.createdAt.seconds : null;

      return {
        id: doc.id,
        ...docData,
        createdAt,
      };
    });

    callback(data);
  });
};
