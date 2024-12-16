import { db } from "@/utils/firebase";

import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const getAchievement = async () => {
    try {
        const q = query(
            collection(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT),
            orderBy("createdAt", "desc")
        );

        const achievementsSnap = await getDocs(q);
        const achievements = achievementsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt:
                doc.data().createdAt?.toDate?.() ||
                new Date(doc.data().createdAt) ||
                new Date(),
        }));

        return achievements;
    } catch (error) {
        console.error("Error fetching achievements:", error);
        return [];
    }
};