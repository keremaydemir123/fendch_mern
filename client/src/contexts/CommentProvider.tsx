import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from 'react';
import { CommentProps } from '../types';

interface ICommentContext {
  comments: CommentProps[];
  onCommentsSet: (comments: CommentProps[]) => void;
  rootComments: CommentProps[];
  createLocalComment: (comment: CommentProps) => void;
  updateLocalComment: (commentId: string, message: string) => void;
  deleteLocalComment: (commentId: string) => void;
  likeLocalComment: (commentId: string) => void;
  dislikeLocalComment: (commentId: string) => void;
  getReplies: (parentId: string) => CommentProps[];
}

type GroupProps = {
  [key: string]: CommentProps[];
};

const Context = createContext<ICommentContext>({} as ICommentContext);

export function useComment() {
  return useContext(Context);
}

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<CommentProps[]>([]);
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

  function onCommentsSet(comments: CommentProps[]) {
    setComments(comments);
  }

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
            likeCount: (comment.likeCount as number) + 1,
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
            likeCount: (comment.likeCount as number) - 1,
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
      comments,
      onCommentsSet,
      getReplies,
      rootComments: commentsByParentId.null,
      createLocalComment,
      updateLocalComment,
      deleteLocalComment,
      likeLocalComment,
      dislikeLocalComment,
    }),
    [comments, commentsByParentId, getReplies]
  );

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
}
