// src/services/achievementService.js
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase'; // Sesuaikan dengan path konfigurasi Firebase Anda

// Fungsi untuk mengambil semua achievement
export const fetchAchievements = async () => {
    try {
        const achievementCollectionRef = collection(db, "achievement");
        const data = await getDocs(achievementCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return filteredData;
    } catch (err) {
        console.error("Error fetching achievements:", err);
        throw err;
    }
};