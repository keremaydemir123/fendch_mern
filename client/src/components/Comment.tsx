import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import IconButton from './IconButton';
import { useChallenge } from '../contexts/ChallengeProvider';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import {
  deleteComment,
  dislikeComment,
  likeComment,
  replyComment,
  updateComment,
} from '../services/comments';
import { CommentProps } from '../types/Comment';
import { useUser } from '../contexts/UserProvider';
import { useComment } from '../contexts/CommentProvider';
import TextButton from './TextButton';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function Comment({
  _id,
  message,
  username,
  avatar,
  createdAt,
  likes,
}: CommentProps) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  const { challenge } = useChallenge();

  const {
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    likeLocalComment,
    dislikeLocalComment,
  } = useComment();

  const { user: currentUser } = useUser();
  const childComments = getReplies(_id);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [likedByMe, setLikedByMe] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    setLikedByMe(likes.includes(currentUser?._id as string));
  }, [likes, currentUser?._id]);

  const onCommentReply = async (msg: string) => {
    if (!currentUser?._id) {
      toast.error('You must be logged in to reply to a comment');
      return;
    }
    setLoading(true);
    setIsReplying(true);
    try {
      const comment = await replyComment({
        challengeId: challenge?._id as string,
        message: msg,
        parentId: _id,
        userId: currentUser?._id,
      });
      createLocalComment(comment);
    } catch (err) {
      setError('Error replying to comment');
    }
    setLoading(false);
    setIsReplying(false);
    setAreChildrenHidden(false);
  };

  const onCommentEdit = async (msg: string) => {
    if (!currentUser?._id) {
      toast.error('You must be logged in to edit a comment');
      return;
    }

    setIsEditing(true);
    setLoading(true);
    try {
      const comment = await updateComment({
        challengeId: challenge?._id as string,
        message: msg,
        id: _id,
      });
      updateLocalComment(_id, comment.message);
    } catch (err) {
      setError('Error updating comment');
    }
    setLoading(false);
    setIsEditing(false);
  };
  const onCommentDelete = async () => {
    try {
      const comment = await deleteComment({
        challengeId: challenge?._id as string,
        id: _id,
      });
      deleteLocalComment(comment._id);
    } catch (err) {
      toast.error('Error deleting comment');
    }
  };

  const onCommentLike = async () => {
    if (!currentUser?._id) {
      toast.error('You must be logged in to like to a comment');
      return;
    }
    await likeComment({
      id: _id,
      challengeId: challenge?._id as string,
      userId: currentUser?._id,
    });
    likeLocalComment(_id);
    setLikedByMe(true);
    setLikeCount((prev) => prev + 1);
  };

  const onCommentDislike = async () => {
    if (!currentUser?._id) {
      throw new Error('You must be logged in to dislike to a comment');
    }
    await dislikeComment({
      id: _id,
      challengeId: challenge?._id as string,
      userId: currentUser?._id,
    });
    dislikeLocalComment(_id);
    setLikedByMe(false);
    setLikeCount((prev) => prev - 1);
  };

  return (
    <>
      <Toaster />
      <AnimatePresence>
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
          {isEditing ? (
            <CommentForm
              autoFocus
              onSubmit={onCommentEdit}
              initialValue={message}
              loading={loading}
              error={error}
            />
          ) : (
            <div className="font-light break-words p-2">{message}</div>
          )}
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
                  onClick={() => onCommentDelete()}
                />
              </>
            )}
          </div>
        </div>
      </AnimatePresence>

      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            onSubmit={onCommentReply}
            loading={loading}
            error={error}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div className={`flex ${areChildrenHidden ? 'hidden' : ''}`}>
            <div className="pl-2 flex-grow">
              <CommentList comments={childComments} place="challenge" />
            </div>
          </div>
          <TextButton
            className={`${
              !areChildrenHidden ? 'hidden' : ''
            } mt-2 bg-transparent`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies ({childComments.length})
          </TextButton>
          <TextButton
            className={`mt-2 ${areChildrenHidden ? 'hidden' : ''}`}
            onClick={() => setAreChildrenHidden(true)}
          >
            Hide Replies
          </TextButton>
        </>
      )}
    </>
  );
}

export default Comment;
