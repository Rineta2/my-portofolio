import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import styles from "@/app/articles/Articles.module.scss";

export function Comment({
  comment,
  user,
  userData,
  onLike,
  onEdit,
  onDelete,
  onReply,
  isEditing,
  editContent,
  setEditContent,
  onCancelEdit,
  onSubmitReply,
  isReplying,
  replyContent,
  setReplyContent,
  onCancelReply,
  onEditReply,
  onDeleteReply,
  onSubmitEditReply,
  onCancelEditReply,
  editingReply,
  visibleReplies,
  onToggleReplies,
}) {
  const isReplyBeingEdited = (replyId) => editingReply === replyId;

  return (
    <div className={styles.comment}>
      {/* Main comment section */}
      <div className={styles.comment_header}>
        <Image
          src={comment.authorPhoto}
          width={40}
          height={40}
          alt={comment.author}
          className={styles.author_photo}
        />
        <div className={styles.comment_meta}>
          <span className={styles.author_name}>
            {comment.author}
            {comment.role === "admins" && (
              <span className={styles.admin_badge}> (Admin)</span>
            )}
          </span>
          <span className={styles.comment_date}>
            {comment.createdAt &&
              format(comment.createdAt.toDate(), "MMM d, yyyy HH:mm")}
          </span>
        </div>
      </div>

      {/* Comment content */}
      {isEditing ? (
        <form
          onSubmit={(e) => onEdit(e, comment.id)}
          className={styles.edit_form}
        >
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            required
          />
          <div className={styles.edit_actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.comment_content_wrapper}>
            <p className={styles.comment_content}>
              {comment.content}
              {comment.edited && (
                <span className={styles.edited_mark}> (edited)</span>
              )}
            </p>
            <div className={styles.like_button_wrapper}>
              <button
                onClick={() => onLike(comment.id)}
                className={styles.like_button}
              >
                {comment.likes?.includes(user?.uid) ? (
                  <AiFillLike className={styles.liked} />
                ) : (
                  <AiOutlineLike />
                )}
                <span>{comment.likes?.length || 0}</span>
              </button>
            </div>
          </div>

          {user &&
            (user.uid === comment.uid || userData?.role === "admins") && (
              <div className={styles.comment_actions}>
                <button
                  onClick={() => onEdit(comment)}
                  className={styles.edit_button}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className={styles.delete_button}
                >
                  Delete
                </button>
              </div>
            )}
        </>
      )}

      {/* Reply section */}
      {user && !isEditing && (
        <button
          onClick={() => onReply(comment.id)}
          className={styles.reply_button}
        >
          {comment.replies?.length > 0
            ? `Reply (${comment.replies.length})`
            : "Reply"}
        </button>
      )}

      {isReplying && (
        <form
          onSubmit={(e) => onSubmitReply(e, comment.id)}
          className={styles.reply_form}
        >
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            required
          />
          <div className={styles.reply_actions}>
            <button type="submit">Post Reply</button>
            <button type="button" onClick={onCancelReply}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Replies list */}
      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies_container}>
          {comment.replies
            .slice(0, visibleReplies[comment.id] ? undefined : 1)
            .map((reply) => (
              <div key={reply.id} className={styles.reply}>
                <div className={styles.reply_header}>
                  <Image
                    src={reply.authorPhoto}
                    width={30}
                    height={30}
                    alt={reply.author}
                    className={styles.author_photo}
                  />
                  <div className={styles.reply_meta}>
                    <span className={styles.author_name}>
                      {reply.author}
                      {reply.role === "admins" && (
                        <span className={styles.admin_badge}> (Admin)</span>
                      )}
                    </span>
                    <span className={styles.reply_date}>
                      {reply.createdAt &&
                        format(reply.createdAt.toDate(), "MMM d, yyyy HH:mm")}
                    </span>
                  </div>
                </div>

                {isReplyBeingEdited(reply.id) ? (
                  <form
                    onSubmit={(e) => onSubmitEditReply(e, comment.id)}
                    className={styles.edit_form}
                  >
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      required
                    />
                    <div className={styles.edit_actions}>
                      <button type="submit">Save</button>
                      <button type="button" onClick={onCancelEditReply}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className={styles.reply_content_wrapper}>
                      <p className={styles.reply_content}>
                        {reply.content}
                        {reply.edited && (
                          <span className={styles.edited_mark}> (edited)</span>
                        )}
                      </p>
                      <div className={styles.like_button_wrapper}>
                        <button
                          onClick={() => onLike(comment.id, reply.id)}
                          className={styles.like_button}
                        >
                          {reply.likes?.includes(user?.uid) ? (
                            <AiFillLike className={styles.liked} />
                          ) : (
                            <AiOutlineLike />
                          )}
                          <span>{reply.likes?.length || 0}</span>
                        </button>
                      </div>
                    </div>

                    {user &&
                      (user.uid === reply.uid ||
                        userData?.role === "admins") && (
                        <div className={styles.reply_actions}>
                          <button
                            onClick={() => onEditReply(reply)}
                            className={styles.edit_button}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteReply(comment.id, reply.id)}
                            className={styles.delete_button}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                  </>
                )}
              </div>
            ))}

          {comment.replies.length > 1 && (
            <button
              className={styles.show_more_button}
              onClick={() => onToggleReplies(comment.id)}
            >
              {visibleReplies[comment.id]
                ? "Show Less"
                : `Show More Replies (${comment.replies.length - 1})`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
