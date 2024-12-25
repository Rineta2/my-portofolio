import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

export function useComments(articleId, user) {
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const [adminsSnap, userSnap] = await Promise.all([
        getDoc(doc(db, process.env.NEXT_PUBLIC_API_ABOUT, user.uid)),
        getDoc(doc(db, process.env.NEXT_PUBLIC_API_USER, user.uid)),
      ]);

      if (userSnap.exists()) {
        setUserData({
          ...userSnap.data(),
          role: adminsSnap.exists()
            ? process.env.NEXT_PUBLIC_API_ADMINS
            : process.env.NEXT_PUBLIC_API_USER,
        });
      }
    };

    const setupRealtimeListeners = () => {
      const commentsRef = collection(db, process.env.NEXT_PUBLIC_API_COMMENTS);
      const q = query(commentsRef, where("articleId", "==", articleId));
      const unsubscribeFunctions = [];

      const unsubscribeComments = onSnapshot(q, async (snapshot) => {
        const commentsPromises = snapshot.docs.map(async (commentDoc) => {
          const repliesRef = collection(
            db,
            `${process.env.NEXT_PUBLIC_API_COMMENTS}/${commentDoc.id}/${process.env.NEXT_PUBLIC_API_REPLIES}`
          );

          const unsubscribeReplies = onSnapshot(
            query(repliesRef),
            (repliesSnapshot) => {
              const replies = repliesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              setComments((prevComments) => {
                const updatedComments = prevComments.map((prevComment) =>
                  prevComment.id === commentDoc.id
                    ? {
                        ...prevComment,
                        replies: replies.sort(
                          (a, b) =>
                            a.createdAt?.toDate() - b.createdAt?.toDate()
                        ),
                      }
                    : prevComment
                );
                return updatedComments.sort(
                  (a, b) => b.createdAt?.toDate() - a.createdAt?.toDate()
                );
              });
            }
          );

          unsubscribeFunctions.push(unsubscribeReplies);

          return {
            id: commentDoc.id,
            ...commentDoc.data(),
            replies: [],
          };
        });

        const commentsData = await Promise.all(commentsPromises);
        setComments(
          commentsData.sort(
            (a, b) => b.createdAt?.toDate() - a.createdAt?.toDate()
          )
        );
      });

      return () => {
        unsubscribeComments();
        unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      };
    };

    fetchUserData();
    return setupRealtimeListeners();
  }, [user, articleId]);

  const handleLike = async (docRef) => {
    if (!user) return false;

    try {
      const snap = await getDoc(docRef);
      if (!snap.exists()) return false;

      const likes = snap.data().likes || [];
      const isLiked = likes.includes(user.uid);

      await updateDoc(docRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
      return true;
    } catch (error) {
      toast.error("Failed to update like");
      return false;
    }
  };

  const addComment = async (content) => {
    if (!content.trim() || !user || !userData) return false;

    setIsLoading(true);
    try {
      await addDoc(collection(db, process.env.NEXT_PUBLIC_API_COMMENTS), {
        articleId,
        articleSlug: articleId,
        content: content.trim(),
        uid: user.uid,
        author: userData.displayName || "Anonymous",
        authorPhoto: userData.photoURL || "/default-avatar.png",
        role: userData.role,
        createdAt: serverTimestamp(),
        likes: [],
      });
      toast.success("Comment posted successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to post comment");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_COMMENTS, commentId));
      toast.success("Comment deleted successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to delete comment");
      return false;
    }
  };

  const updateComment = async (commentId, content) => {
    try {
      await updateDoc(
        doc(db, process.env.NEXT_PUBLIC_API_COMMENTS, commentId),
        {
          content: content.trim(),
          edited: true,
        }
      );
      toast.success("Comment updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update comment");
      return false;
    }
  };

  return {
    comments,
    userData,
    isLoading,
    handleLike,
    addComment,
    deleteComment,
    updateComment,
  };
}
