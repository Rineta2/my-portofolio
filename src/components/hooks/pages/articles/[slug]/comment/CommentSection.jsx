import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { CommentForm } from "@/components/hooks/pages/articles/[slug]/comment/CommentForm";
import { Comment } from "@/components/hooks/pages/articles/[slug]/comment/Comment";
import { useComments } from "@/components/hooks/pages/articles/[slug]/comment/utils/ueComments";
import { toast } from "react-hot-toast";
import styles from "@/app/articles/Articles.module.scss";
import AuthModal from "@/components/layout/header/auth/AuthModal";

export default function CommentSection({ articleId }) {
  const [user] = useAuthState(auth);
  const { comments, userData, isLoading, handleLike } = useComments(
    articleId,
    user
  );

  // State Management
  const [newComment, setNewComment] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState("login");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editingReply, setEditingReply] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [visibleReplies, setVisibleReplies] = useState({});

  const handleLikeComment = async (commentId, replyId = null) => {
    const docReference = replyId
      ? doc(
          db,
          `${process.env.NEXT_PUBLIC_API_COMMENTS}/${commentId}/${process.env.NEXT_PUBLIC_API_REPLIES}`,
          replyId
        )
      : doc(db, `${process.env.NEXT_PUBLIC_API_COMMENTS}`, commentId);

    await handleLike(docReference);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !userData) return;

    try {
      await addDoc(collection(db, process.env.NEXT_PUBLIC_API_COMMENTS), {
        articleId,
        articleSlug: articleId,
        content: newComment.trim(),
        uid: user.uid,
        author: userData.displayName || "Anonymous",
        authorPhoto: userData.photoURL || "/default-avatar.png",
        role: userData.role,
        createdAt: serverTimestamp(),
        likes: [],
      });
      setNewComment("");
      toast.success("Komentar berhasil dipost!");
    } catch (error) {
      toast.error("Gagal mempost komentar");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus komentar ini?"))
      return;

    try {
      await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_COMMENTS, commentId));
      toast.success("Komentar berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus komentar");
    }
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    try {
      await updateDoc(
        doc(db, process.env.NEXT_PUBLIC_API_COMMENTS, editingComment),
        {
          content: editContent.trim(),
          edited: true,
        }
      );
      setEditingComment(null);
      setEditContent("");
      toast.success("Komentar berhasil diubah!");
    } catch (error) {
      toast.error("Gagal mengubah komentar");
    }
  };

  // Reply Handlers
  const handleSubmitReply = async (e, parentId) => {
    e.preventDefault();
    if (!replyContent.trim() || !user || !userData) return;

    try {
      const replyRef = collection(
        db,
        `${process.env.NEXT_PUBLIC_API_COMMENTS}/${parentId}/${process.env.NEXT_PUBLIC_API_REPLIES}`
      );
      await addDoc(replyRef, {
        articleId,
        articleSlug: articleId,
        content: replyContent.trim(),
        uid: user.uid,
        author: userData.displayName || "Anonymous",
        authorPhoto: userData.photoURL || "/default-avatar.png",
        role: userData.role,
        createdAt: serverTimestamp(),
        likes: [],
      });

      setReplyContent("");
      setReplyingTo(null);
      toast.success("Balasan berhasil dipost!");
    } catch (error) {
      toast.error("Gagal mempost balasan");
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus balasan ini?"))
      return;

    try {
      await deleteDoc(
        doc(
          db,
          process.env.NEXT_PUBLIC_API_COMMENTS,
          commentId,
          process.env.NEXT_PUBLIC_API_REPLIES,
          replyId
        )
      );
      toast.success("Balasan berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus balasan");
    }
  };

  const handleEditReply = async (e, commentId) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    try {
      await updateDoc(
        doc(
          db,
          process.env.NEXT_PUBLIC_API_COMMENTS,
          commentId,
          process.env.NEXT_PUBLIC_API_REPLIES,
          editingReply
        ),
        {
          content: editContent.trim(),
          edited: true,
        }
      );
      setEditingReply(null);
      setEditContent("");
      toast.success("Balasan berhasil diubah!");
    } catch (error) {
      toast.error("Gagal mengubah balasan");
    }
  };

  // UI Handlers
  const handleLoginClick = () => setShowAuthModal(true);
  const handleCloseModal = () => setShowAuthModal(false);
  const toggleRepliesVisibility = (commentId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className={styles.comments}>
      <h2>Comments</h2>

      {user ? (
        <CommentForm
          content={newComment}
          setContent={setNewComment}
          isLoading={isLoading}
          onSubmit={handleSubmitComment}
        />
      ) : (
        <div className={styles.login_prompt}>
          <p>Please login to comment</p>
          <button onClick={handleLoginClick} className={styles.login_button}>
            Login to Comment
          </button>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={handleCloseModal}
        activeTab={activeAuthTab}
        onTabChange={setActiveAuthTab}
      />

      <div className={styles.comments_list}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            user={user}
            userData={userData}
            onLike={handleLikeComment}
            onEdit={(comment) => {
              setEditingComment(comment.id);
              setEditContent(comment.content);
            }}
            handleEditComment={handleEditComment}
            onDelete={handleDeleteComment}
            onReply={(commentId) => setReplyingTo(commentId)}
            isEditing={editingComment === comment.id}
            editContent={editContent}
            setEditContent={setEditContent}
            onCancelEdit={() => {
              setEditingComment(null);
              setEditContent("");
            }}
            isReplying={replyingTo === comment.id}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            onSubmitReply={handleSubmitReply}
            onCancelReply={() => setReplyingTo(null)}
            onEditReply={(reply) => {
              setEditingReply(reply.id);
              setEditContent(reply.content);
            }}
            onDeleteReply={handleDeleteReply}
            onSubmitEditReply={handleEditReply}
            onCancelEditReply={() => {
              setEditingReply(null);
              setEditContent("");
            }}
            editingReply={editingReply}
            visibleReplies={visibleReplies}
            onToggleReplies={toggleRepliesVisibility}
          />
        ))}
      </div>
    </div>
  );
}
