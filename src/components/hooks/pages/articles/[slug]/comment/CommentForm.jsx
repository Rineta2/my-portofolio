import React from "react";
import styles from "@/app/articles/Articles.module.scss";

export function CommentForm({
  content,
  setContent,
  isLoading,
  onSubmit,
  placeholder = "Write a comment...",
  submitLabel = "Post Comment",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.comment_form}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        required
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Posting..." : submitLabel}
      </button>
    </form>
  );
}
