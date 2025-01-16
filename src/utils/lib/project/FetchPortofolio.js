import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { cache } from "react";

export const fetchPortofolio = cache(async () => {
  try {
    const portofolioRef = collection(db, process.env.NEXT_PUBLIC_API_PROJECT);
    const portofolioQuery = query(portofolioRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(portofolioQuery);
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      let date = null;

      if (docData.date?.seconds) {
        date = new Date(docData.date.seconds * 1000).toISOString();
      } else if (docData.date) {
        try {
          date = new Date(docData.date).toISOString();
        } catch (e) {
          console.warn(
            `Invalid date format for document ${doc.id}:`,
            docData.date
          );
          date = null;
        }
      }

      return {
        id: doc.id,
        ...docData,
        date,
      };
    });

    return data;
  } catch (error) {
    return [];
  }
});
