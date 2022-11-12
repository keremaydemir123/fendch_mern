import React from "react";
import IconButton from "../IconButton";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import { useChallenge } from "../../contexts/ChallengeContext";
import { useCookieUser } from "../../hooks/useCookieUser";
import CommentList from "./CommentList";
import { useState } from "react";
import CommentForm from "./CommentForm";
import {
  createComment,
  deleteComment,
  toggleCommentLike,
  updateComment,
} from "../../services/comments";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function Comment({ id, message, user, createdAt, likeCount, likedByMe }) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const {
    challenge,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike,
  } = useChallenge();
  const currentUser = useCookieUser();
  const childComments = getReplies(id);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  async function onCommentReply(message) {
    const comment = await createComment({
      challengeId: challenge.id,
      message,
      parentId: id,
    });
    setIsReplying(false);
    createLocalComment(comment);
  }

  async function onCommentEdit(message) {
    const comment = updateComment({ challengeId: challenge.id, message, id });
    setIsEditing(false);
    updateLocalComment(id, comment.message);
  }
  async function onCommentDelete() {
    const comment = await deleteComment({ challengeId: challenge.id, id });
    deleteLocalComment(comment.id);
  }

  async function onToggleCommentLike() {
    const like = await toggleCommentLike({ id, challengeId: challenge.id });
    toggleLocalCommentLike(id, like);
  }

  return (
    <>
      <div className="w-full flex flex-col bg-slate-50 rounded-md px-2 mt-4">
        <div className="flex justify-between items-center  py-1">
          <span className="font-medium">{user.username}</span>
          <span className="font-light italic text-gray-500 text-sm">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus={true}
            onSubmit={onCommentEdit}
            initialValue={message}
          />
        ) : (
          <div className="font-light break-words">{message}</div>
        )}

        <div className="flex items-center justify-between  border-t-[1px]">
          <IconButton
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? "Unlike" : "Like"}
            onClick={onToggleCommentLike}
          >
            {likeCount}
          </IconButton>
          <IconButton
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
          />

          {user.id === currentUser.id && (
            <>
              <IconButton
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
              />
              <IconButton
                Icon={FaTrash}
                aria-label="Delete"
                color="text-red-500"
                onClick={() => onCommentDelete()}
              />
            </>
          )}
        </div>
      </div>

      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm autoFocus={true} onSubmit={onCommentReply} />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div className={`flex ${areChildrenHidden ? "hidden" : ""}`}>
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="pl-2 flex-grow">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hidden" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
}

export default Comment;
