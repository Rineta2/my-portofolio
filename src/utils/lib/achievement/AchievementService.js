import { collection, getDocs, addDoc } from 'firebase/firestore';

import { db } from '@/utils/firebase';

export const fetchAchievements = async () => {
    try {
        const achievementCollectionRef = collection(db, "achievement");
        const data = await getDocs(achievementCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return filteredData.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
            const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
            return dateB - dateA;
        });
    } catch (err) {
        console.error("Error fetching achievements:", err);
        throw err;
    }
};