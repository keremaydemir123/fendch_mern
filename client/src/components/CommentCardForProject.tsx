import { useParams } from 'react-router-dom';
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import IconButton from './IconButton';
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
import CommentList from './CommentList';
import { useComment } from '../contexts/CommentProvider';

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
  likes,
}: CommentProps) {
  const { user: currentUser } = useUser();
  const { id: projectId } = useParams<{ id: string }>();
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [likedByMe, setLikedByMe] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    setLikedByMe(likes.includes(currentUser?._id as string));
  }, [likes, currentUser?._id]);

  const {
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    likeLocalComment,
    dislikeLocalComment,
  } = useComment();

  const childComments = getReplies(_id);

  async function onCommentReply(msg: string) {
    if (!currentUser?._id) return;
    if (!projectId) return;
    setLoading(true);
    setIsReplying(true);
    try {
      const comment = await replyProjectComment({
        projectId,
        message: msg,
        parentId: _id,
        userId: currentUser?._id,
      });

      createLocalComment(comment);
    } catch (err) {
      setError("Couldn't reply to comment");
    }
    setLoading(false);
    setIsReplying(false);
  }

  async function onCommentEdit(msg: string) {
    if (!projectId) return;
    setIsEditing(true);
    setLoading(true);
    try {
      await updateProjectComment({
        projectId,
        message: msg,
        id: _id,
      });
      setLoading(false);
      setIsEditing(false);
      updateLocalComment(_id, message);
    } catch (err) {
      setError("Couldn't edit comment");
    }
  }
  async function onCommentDelete() {
    if (!projectId) return;

    await deleteProjectComment({
      projectId,
      id: _id,
    });
    deleteLocalComment(_id);
  }
  async function onCommentLike() {
    if (!currentUser?._id) return;
    if (!projectId) return;

    try {
      setLoading(true);
      await likeProjectComment({
        id: _id,
        projectId,
        userId: currentUser?._id,
      });
      likeLocalComment(_id);
      setLoading(false);
      setLikeCount((prev) => prev + 1);
      setLikedByMe(true);
    } catch (err) {
      toast.error('Error liking comment');
    }
  }
  async function onCommentDislike() {
    if (!currentUser?._id) return;
    if (!projectId) return;
    setLoading(true);
    try {
      await dislikeProjectComment({
        id: _id,
        projectId,
        userId: currentUser?._id,
      });
      dislikeLocalComment(_id);
      setLoading(false);
      setLikeCount((prev) => prev - 1);
      setLikedByMe(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const handleToggleLike = () => {
    if (loading) return;
    if (likedByMe) {
      onCommentDislike();
    } else {
      onCommentLike();
    }
  };

  return (
    <>
      <div className="w-full flex flex-col bg-primary rounded-md mt-4 overflow-hidden shadow-lg shadow-dark">
        <div className="flex justify-between items-center p-2 bg-dark bg-opacity-30">
          <span className="font-normal flex gap-2 items-center">
            <img
              src={avatar}
              alt="avatar"
              className="rounded-full h-8 w-8 object-cover"
            />
            {username}
          </span>
          <span className="font-light italic text-light text-sm">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>

        <div>
          {isEditing ? (
            <CommentForm
              autoFocus
              onSubmit={() => onCommentEdit(message)}
              initialValue={message}
              loading={loading}
              error={error}
            />
          ) : (
            <div className="font-light break-words p-2">{message}</div>
          )}
        </div>

        <div className="flex items-center justify-between px-2">
          <IconButton
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? 'Unlike' : 'Like'}
            onClick={handleToggleLike}
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
                onClick={() => onCommentDelete()}
              />
            </>
          )}
        </div>
      </div>

      <div>
        {isReplying && (
          <div className="mt-1 ml-3">
            <CommentForm
              autoFocus
              onSubmit={() => onCommentReply(message)}
              initialValue=""
              loading={loading}
              error={error}
            />
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
                type="button"
                onClick={() => setAreChildrenHidden(true)}
              />
              <div className="pl-2 flex-grow">
                <CommentList comments={childComments} place="project" />
              </div>
            </div>
            <button
              className={`btn mt-1 ${!areChildrenHidden ? 'hidden' : ''}`}
              onClick={() => setAreChildrenHidden(false)}
              type="button"
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
