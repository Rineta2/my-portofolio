import { db } from "@/utils/firebase";

import { collection, getDocs } from "firebase/firestore";

export const getAbout = async () => {
    return await getDocs(collection(db, process.env.NEXT_PUBLIC_API_ABOUT)).then((snaps) =>
        snaps.docs.map((d) => d.data())
    );
};