import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getChallenge } from '../services/challenges';
import Loading from '../components/Loading';
import { ChallengeProps, CommentProps } from '../types';

interface IChallengeContext {
  challenge: ChallengeProps | undefined;
  getReplies: (parentId: string) => CommentProps[];
  rootComments: CommentProps[];
  createLocalComment: (comment: CommentProps) => void;
  updateLocalComment: (id: string, message: string) => void;
  deleteLocalComment: (id: string) => void;
  likeLocalComment: (id: string) => void;
  dislikeLocalComment: (id: string) => void;
}

const Context = createContext<IChallengeContext>({} as IChallengeContext);

export function useChallenge() {
  return useContext(Context);
}

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [challenge, setChallenge] = useState<ChallengeProps>();

  const { isLoading } = useQuery(['getChallenge', id], () => getChallenge(id), {
    onSuccess: (data) => {
      setChallenge(data);
    },
  });

  useEffect(() => {
    if (challenge?.comments == null) return;
    setComments(challenge.comments);
  }, [challenge?.comments]);

  type GroupProps = {
    [key: string]: CommentProps[];
  };

  const commentsByParentId = useMemo((): GroupProps => {
    const groups: GroupProps = {};

    comments?.forEach((comment) => {
      if (comment.parentId) {
        if (groups[comment.parentId]) {
          groups[comment.parentId].push(comment);
        } else {
          groups[comment.parentId] = [comment];
        }
      }
    });

    return groups;
  }, [comments]);

  function createLocalComment(comment: CommentProps) {
    setComments((prevComments) => [comment, ...prevComments]);
  }

  function updateLocalComment(commentId: string, message: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, message };
        }
        return comment;
      });
    });
  }

  function deleteLocalComment(commentId: string) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment._id !== commentId);
    });
  }

  function likeLocalComment(commentId: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            likeCount: comment.likeCount + 1,
            likedByMe: true,
          };
        }
        return comment;
      });
    });
  }

  function dislikeLocalComment(commentId: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            likeCount: comment.likeCount - 1,
            likedByMe: false,
          };
        }
        return comment;
      });
    });
  }

  const getReplies = useCallback(
    (parentId: string) => {
      return commentsByParentId[parentId];
    },
    [commentsByParentId]
  );

  const contextValues = useMemo(
    () => ({
      challenge,
      getReplies,
      rootComments: commentsByParentId.null,
      createLocalComment,
      updateLocalComment,
      deleteLocalComment,
      likeLocalComment,
      dislikeLocalComment,
    }),
    [challenge, commentsByParentId, getReplies]
  );

  return (
    <Context.Provider value={contextValues}>
      <>
        {isLoading && <Loading />}
        {children}
      </>
    </Context.Provider>
  );
}
