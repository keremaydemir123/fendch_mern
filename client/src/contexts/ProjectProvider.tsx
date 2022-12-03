import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import { CommentProps, ProjectProps } from '../types';
import { getProject } from '../services/projects';
import { useUser } from './UserProvider';

type GroupProps = {
  [key: string]: CommentProps[];
};

const Context = createContext({
  project: {} as ProjectProps,
  getReplies: (parentId: string): CommentProps[] => [],
  rootComments: [] as CommentProps[],
  likeLocalProject: (projectId: string) => {},
  dislikeLocalProject: (projectId: string) => {},
  createLocalComment: (comment: CommentProps) => {},
  updateLocalComment: (id: string, message: string) => {},
  deleteLocalComment: (id: string) => {},
  likeLocalComment: (id: string) => {},
  dislikeLocalComment: (id: string) => {},
  updateLocalProjectMarkdown: (markdown: string) => {},
});

export function useProject() {
  return useContext(Context);
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const { user } = useUser();
  const [project, setProject] = useState<ProjectProps>({} as ProjectProps);
  const [comments, setComments] = useState<CommentProps[]>([]);

  const { isLoading, error } = useQuery<ProjectProps>(
    ['getProject', id],
    () => getProject(id!),
    {
      onSuccess: (data) => {
        setProject({
          ...data,
          likedByMe: data.likes.includes(user?._id!),
        });
      },
    }
  );

  useEffect(() => {
    if (project?.comments == null) return;
    setComments(project.comments);
  }, [project?.comments]);

  const commentsByParentId = useMemo((): GroupProps => {
    const groups: GroupProps = {};

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

  function likeLocalProject(id: string) {
    setProject((prev) => {
      if (prev._id === id) {
        return {
          ...project,
          likeCount: project.likeCount + 1,
          likedByMe: true,
        };
      }
      return project;
    });
  }
  function dislikeLocalProject(id: string) {
    setProject((prev) => {
      if (prev._id === id) {
        return {
          ...project,
          likeCount: project.likeCount - 1,
          likedByMe: false,
        };
      }
      return project;
    });
  }

  function createLocalComment(comment: CommentProps) {
    setComments((prevComments) => [comment, ...prevComments]);
  }

  function updateLocalComment(id: string, message: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === id) {
          return { ...comment, message };
        }
        return comment;
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
        }
        return comment;
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
        }
        return comment;
      });
    });
  }

  function getReplies(parentId: string) {
    return commentsByParentId[parentId];
  }

  function updateLocalProjectMarkdown(markdown: string) {
    setProject((prev) => {
      return { ...prev, markdown };
    });
  }

  return (
    <Context.Provider
      value={{
        project: { ...project! },
        getReplies,
        rootComments: commentsByParentId.null,
        likeLocalProject,
        dislikeLocalProject,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        likeLocalComment,
        dislikeLocalComment,
        updateLocalProjectMarkdown,
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
