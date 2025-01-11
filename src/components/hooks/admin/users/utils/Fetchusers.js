import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchUsers = async () => {
  try {
    const q = query(
      collection(db, "users"),
      where("role", "in", ["users", "authors"])
    );
    const querySnapshot = await getDocs(q);

    const userData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return userData;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
