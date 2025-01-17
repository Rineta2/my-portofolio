"use client";

import { useEffect, useState } from "react";

import { collection, onSnapshot, getDocs } from "firebase/firestore";

import { db } from "@/utils/firebase";

export function useFirestoreCollection(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);

    // Get initial data immediately
    getDocs(collectionRef).then((snapshot) => {
      const collectionData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(collectionData);
    });

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const collectionData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(collectionData);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return data;
}
