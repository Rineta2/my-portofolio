// import { collection, getDocs, query, orderBy } from "firebase/firestore";

// import { db } from "@/utils/firebase";

// import { cache } from "react";

// export const fetchVideos = cache(async () => {
//   try {
//     const youtubeRef = collection(db, process.env.NEXT_PUBLIC_API_VIDEOS);
//     const youtubeQuery = query(youtubeRef, orderBy("title"));

//     const querySnapshot = await getDocs(youtubeQuery);
//     const data = querySnapshot.docs.map((doc) => {
//       const docData = doc.data();

//       const createdAt = docData.createdAt ? docData.createdAt.seconds : null;
//       const date = docData.date ? docData.date.seconds : null;

//       return {
//         id: doc.id,
//         ...docData,
//         createdAt,
//         date,
//       };
//     });

//     return data;
//   } catch (error) {
//     console.error("Error fetching videos:", error);
//     return [];
//   }
// });

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchVideos = async () => {
  return await getDocs(collection(db, process.env.NEXT_PUBLIC_API_VIDEOS)).then(
    (snaps) =>
      snaps.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt?.seconds || null,
          date: data.date?.seconds || null,
        };
      })
  );
};
