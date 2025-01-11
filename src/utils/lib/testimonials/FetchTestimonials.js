import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const fetchTestimonials = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, process.env.NEXT_PUBLIC_API_TESTIMONIAL),
      { next: { revalidate: 30 } }
    );
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      let timestamp;
      if (docData.createdAt && docData.createdAt.toDate) {
        timestamp = docData.createdAt.toDate().getTime();
      } else {
        timestamp = Date.now();
      }

      return {
        id: doc.id,
        content: docData.content || "",
        name: docData.name || "Anonymous",
        photoURL: docData.photoURL || "/default-avatar.png",
        position: docData.position || "",
        uid: docData.uid || "",
        createdAt: timestamp,
      };
    });

    return data.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    return [];
  }
};
