import { collection, getDocs } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const fetchData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "achievement"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        return [];
    }
};

export default fetchData;