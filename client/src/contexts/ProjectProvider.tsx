import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import { CommentProps, ProjectProps } from '../types';
import { getProject } from '../services/projects';

const Context = createContext({
  project: {} as ProjectProps,
  getReplies: (parentId: string): CommentProps[] => [],
  rootComments: [] as CommentProps[],
  createLocalComment: (comment: CommentProps) => {},
  updateLocalComment: (id: string, message: string) => {},
  deleteLocalComment: (id: string) => {},
  toggleLocalCommentLike: (id: string, addLike: unknown) => {},
});

export function useProject() {
  return useContext(Context);
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams();

  const {
    isLoading,
    error,
    data: project,
  } = useQuery<ProjectProps>(['getProject', id], () => getProject(id!));

  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    if (project?.comments == null) return;
    setComments(project.comments);
  }, [project?.comments]);

  type groupProps = {
    [key: string]: CommentProps[];
  };

  const commentsByParentId = useMemo((): groupProps => {
    const groups: groupProps = {};
    console.log('comments: ', comments);

    comments?.forEach((comment) => {
      if (comment.parentId) {
        console.log(comment.parentId);

        if (groups[comment.parentId]) {
          groups[comment.parentId].push(comment);
        } else {
          groups[comment.parentId] = [comment];
        }
      }
    });

    return groups;
  }, [comments]);

  // const commentsByParentId: groupProps = useMemo(() => {
  //   if (comments.length < 1) return [];
  //   const group: groupProps = {};
  //   comments.forEach((comment) => {
  //     group[comment.parentId] ||= [];
  //     group[comment.parentId].push(comment);
  //   });
  //   return group;
  // }, [comments]);

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

  function toggleLocalCommentLike(id: string, addLike: unknown) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (id === comment._id) {
          if (addLike) {
            console.log(addLike);

            return {
              ...comment,
              likedCount: comment.likeCount + 1,
              likedByMe: true,
            };
          } else {
            return {
              ...comment,
              likedCount: comment.likeCount - 1,
              likedByMe: false,
            };
          }
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
        project: { ...project! },
        getReplies,
        rootComments: commentsByParentId['null'],
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
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
