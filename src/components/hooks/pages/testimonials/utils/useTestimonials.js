import { useState } from "react";
import { addDoc, collection, Timestamp, getDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";

export function useTestimonials(initialTestimonials) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const hasUserSubmitted = (uid) => {
    if (!uid) return false;
    return testimonials.some((testimonial) => testimonial.uid === uid);
  };

  const submitTestimonial = async (formData, user) => {
    if (hasUserSubmitted(user.uid)) {
      toast.error("Anda sudah memberikan testimonial");
      return false;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      const testimonialData = {
        ...formData,
        name: user.displayName || "Anonim",
        position: formData.position,
        uid: user.uid,
        createdAt: Timestamp.now(),
        photoURL: userData?.photoURL || "/default-avatar.png",
      };

      const docRef = await addDoc(
        collection(db, process.env.NEXT_PUBLIC_API_TESTIMONIAL),
        testimonialData
      );

      setTestimonials([
        {
          ...testimonialData,
          id: docRef.id,
          createdAt: testimonialData.createdAt.toDate().getTime(),
        },
        ...testimonials,
      ]);

      toast.success("Testimonial berhasil ditambahkan!");
      return true;
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan testimonial");
      return false;
    }
  };

  return {
    testimonials,
    submitTestimonial,
    hasUserSubmitted,
  };
}
