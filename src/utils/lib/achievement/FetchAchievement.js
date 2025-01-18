import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const subscribeToAchievement = (callback) => {
  const achievementRef = collection(
    db,
    process.env.NEXT_PUBLIC_API_ACHIEVEMENT
  );
  const achievementQuery = query(achievementRef, orderBy("date"));

  // Mengembalikan fungsi unsubscribe
  return onSnapshot(achievementQuery, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      // Konversi timestamp Firestore ke milliseconds
      const date = docData.date
        ? docData.date.seconds * 1000
        : new Date("1970-01-21").getTime();

      return {
        id: doc.id,
        ...docData,
        date,
      };
    });

    callback(data);
  });
};
