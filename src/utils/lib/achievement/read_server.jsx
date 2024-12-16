import { db } from "@/utils/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export const getAchievement = async () => {
    return new Promise((resolve) => {
        const q = query(
            collection(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const achievements = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            resolve(achievements);
        });
    });
};