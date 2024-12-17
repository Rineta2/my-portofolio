import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/utils/firebase';

export const fetchProjects = async (slug) => {
    if (slug) {
        const q = query(collection(db, "projects"), where("slug", "==", slug));
        const data = await getDocs(q);
        const project = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))[0];
        return project;
    }

    const projectCollectionRef = collection(db, "projects");
    const data = await getDocs(projectCollectionRef);
    const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return filteredData;
};


