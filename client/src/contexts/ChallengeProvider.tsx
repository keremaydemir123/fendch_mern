import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getChallenge } from '../services/challenges';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import { ChallengeProps, CommentProps } from '../types';

const Context = createContext({
  challenge: {} as ChallengeProps,
  getReplies: (parentId: string): CommentProps[] => [],
  rootComments: [] as CommentProps[],
  createLocalComment: (comment: CommentProps) => {},
  updateLocalComment: (id: string, message: string) => {},
  deleteLocalComment: (id: string) => {},
  likeLocalComment: (id: string) => {},
  dislikeLocalComment: (id: string) => {},
});

export function useChallenge() {
  return useContext(Context);
}

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const [comments, setComments] = useState<CommentProps[]>([]);

  const {
    isLoading,
    error,
    data: challenge,
  } = useQuery<ChallengeProps>(['getChallenge', id], () => getChallenge(id!));

  useEffect(() => {
    if (challenge?.comments == null) return;
    setComments(challenge.comments);
  }, [challenge?.comments]);

  type groupProps = {
    [key: string]: CommentProps[];
  };

  const commentsByParentId = useMemo((): groupProps => {
    const groups: groupProps = {};

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

  function updateLocalComment(id: string, message: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  function deleteLocalComment(id: string) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment._id !== id);
    });
  }

  function likeLocalComment(id: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === id) {
          return {
            ...comment,
            likeCount: comment.likeCount + 1,
            likedByMe: true,
          };
        } else {
          return comment;
        }
      });
    });
  }

  function dislikeLocalComment(id: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === id) {
          return {
            ...comment,
            likeCount: comment.likeCount - 1,
            likedByMe: false,
          };
        } else {
          return comment;
        }
      });
    });
  }

  function getReplies(parentId: string) {
    return commentsByParentId[parentId];
  }

  return (
    <Context.Provider
      value={{
        challenge: { ...challenge! },
        getReplies,
        rootComments: commentsByParentId['null'],
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        likeLocalComment,
        dislikeLocalComment,
      }}
    >
      {isLoading ? (
        <Loading />
      ) : error ? (
        <h1>Something went wrong</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
