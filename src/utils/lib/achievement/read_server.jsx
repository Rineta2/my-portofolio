// import { db } from "@/utils/firebase";

// import { collection, getDocs } from "firebase/firestore";

// export const getAchievement = async () => {
//     return await getDocs(collection(db, process.env.NEXT_PUBLIC_API_ACHIEVEMENT)).then((snaps) =>
//         snaps.docs.map((d) => d.data())
//     );
// };

import { db } from "@/utils/firebase"

import { collection, getDocs } from "firebase/firestore"

export const getAchievement = async () => {
    return await getDocs(collection(db, 'achievement')).then((snaps) => snaps.docs.map(d => d.data()))
}