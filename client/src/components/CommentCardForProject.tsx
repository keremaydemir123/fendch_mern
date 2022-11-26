import IconButton from './IconButton';
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from 'react-icons/fa';
import CommentList from './CommentList';
import { useState } from 'react';
import CommentForm from './CommentForm';
import {
  deleteProjectComment,
  dislikeProjectComment,
  likeProjectComment,
  replyProjectComment,
  updateProjectComment,
} from '../services/comments';
import { CommentProps } from '../types/Comment';
import { useUser } from '../contexts/UserProvider';
import { useProject } from '../contexts/ProjectProvider';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function CommentCardForProject({
  _id,
  message,
  username,
  avatar,
  createdAt,
  likeCount,
  likedByMe,
}: CommentProps) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  const {
    project,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    likeLocalComment,
    dislikeLocalComment,
  } = useProject();

  const { user: currentUser } = useUser();
  const childComments = getReplies(_id);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  async function onCommentReply(message: string) {
    const comment = await replyProjectComment({
      projectId: project?._id!,
      message,
      parentId: _id,
      userId: currentUser?._id!,
    });
    setIsReplying(false);
    createLocalComment(comment);
  }

  async function onCommentEdit(message: string) {
    await updateProjectComment({
      projectId: project?._id!,
      message,
      id: _id,
    });
    setIsEditing(false);
    updateLocalComment(_id, message);
  }
  async function onCommentDelete() {
    await deleteProjectComment({
      projectId: project?._id!,
      id: _id,
    });
    deleteLocalComment(_id);
  }

  async function onCommentLike() {
    await likeProjectComment({
      id: _id,
      projectId: project?._id!,
      userId: currentUser?._id!,
    });
    likeLocalComment(_id);
  }

  async function onCommentDislike() {
    await dislikeProjectComment({
      id: _id,
      projectId: project?._id!,
      userId: currentUser?._id!,
    });
    dislikeLocalComment(_id);
  }

  return (
    <>
      <div className="w-full flex flex-col bg-primary rounded-md mt-4 overflow-hidden">
        <div className="flex justify-between items-center p-2 bg-secondary">
          <span className="font-medium flex gap-2">
            <img src={avatar} alt="avatar" className="rounded-full h-6 w-6" />
            {username}
          </span>
          <span className="font-light italic text-light text-sm">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>

        <div>
          {isEditing ? (
            <CommentForm
              autoFocus={true}
              onSubmit={onCommentEdit}
              initialValue={message}
            />
          ) : (
            <div className="font-light break-words p-2">{message}</div>
          )}
        </div>

        <div className="flex items-center justify-between px-2">
          <IconButton
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? 'Unlike' : 'Like'}
            onClick={likedByMe ? onCommentDislike : onCommentLike}
          >
            {likeCount}
          </IconButton>
          <IconButton
            Icon={FaReply}
            aria-label={isReplying ? 'Cancel Reply' : 'Reply'}
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
          />

          {username === currentUser?.username && (
            <>
              <IconButton
                Icon={FaEdit}
                aria-label={isEditing ? 'Cancel Edit' : 'Edit'}
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

      <div>
        {isReplying && (
          <div className="mt-1 ml-3">
            <CommentForm autoFocus={true} onSubmit={onCommentReply} />
          </div>
        )}
      </div>

      <div>
        {childComments?.length > 0 && (
          <>
            <div className={`flex ${areChildrenHidden ? 'hidden' : ''}`}>
              <button
                className="collapse-line"
                aria-label="Hide Replies"
                onClick={() => setAreChildrenHidden(true)}
              />
              <div className="pl-2 flex-grow">
                <CommentList comments={childComments} place="project" />
              </div>
            </div>
            <button
              className={`btn mt-1 ${!areChildrenHidden ? 'hidden' : ''}`}
              onClick={() => setAreChildrenHidden(false)}
            >
              Show Replies
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default CommentCardForProject;
