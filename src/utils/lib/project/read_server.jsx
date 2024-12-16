import { db } from "@/utils/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

export async function getProjects(slug) {
    if (slug) {
        const q = query(collection(db, process.env.NEXT_PUBLIC_API_PROJECT), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        const project = querySnapshot.docs.map((doc) => doc.data())[0];
        return project;
    } else {
        return await getDocs(collection(db, process.env.NEXT_PUBLIC_API_PROJECT)).then((snaps) =>
            snaps.docs.map((d) => d.data())
        );
    }
}