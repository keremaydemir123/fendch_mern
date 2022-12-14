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
import Loading from '../components/Loading';
import { CommentProps, ProjectProps } from '../types';
import { getProject } from '../services/projects';
import { useUser } from './UserProvider';

type GroupProps = {
  [key: string]: CommentProps[];
};

interface IProjectContext {
  project: ProjectProps | undefined;
  getReplies: (parentId: string) => CommentProps[];
  rootComments: CommentProps[];
  likeLocalProject: (projectId: string) => void;
  dislikeLocalProject: (projectId: string) => void;
  createLocalComment: (comment: CommentProps) => void;
  updateLocalComment: (commentId: string, message: string) => void;
  deleteLocalComment: (commentId: string) => void;
  likeLocalComment: (commentId: string) => void;
  dislikeLocalComment: (commentId: string) => void;
  updateLocalProjectMarkdown: (markdown: string) => void;
}

const Context = createContext<IProjectContext>({} as IProjectContext);

export function useProject() {
  return useContext(Context);
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const { user } = useUser();
  const [project, setProject] = useState<ProjectProps>({} as ProjectProps);
  const [comments, setComments] = useState<CommentProps[]>([]);

  const { isLoading } = useQuery<ProjectProps>(
    ['getProject', id],
    () => getProject(id),
    {
      onSuccess: (data) => {
        setProject({
          ...data,
          likedByMe: data.likes.includes(user?._id as string),
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
        if (groups[comment.parentId]) {
          groups[comment.parentId].push(comment);
        } else {
          groups[comment.parentId] = [comment];
        }
      }
    });

    return groups;
  }, [comments]);

  const likeLocalProject = useCallback(
    (projectId: string) => {
      setProject((prev) => {
        if (prev._id === projectId) {
          return {
            ...project,
            likeCount: project.likeCount + 1,
            likedByMe: true,
          };
        }
        return project;
      });
    },
    [project]
  );

  const dislikeLocalProject = useCallback(
    (projectId: string) => {
      setProject((prev) => {
        if (prev._id === projectId) {
          return {
            ...project,
            likeCount: project.likeCount - 1,
            likedByMe: false,
          };
        }
        return project;
      });
    },
    [project]
  );

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

  function updateLocalProjectMarkdown(markdown: string) {
    setProject((prev) => {
      return { ...prev, markdown };
    });
  }

  const contextValues = useMemo(
    () => ({
      project,
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
    }),
    [
      project,
      commentsByParentId,
      likeLocalProject,
      dislikeLocalProject,
      getReplies,
    ]
  );

  return (
    <Context.Provider value={contextValues}>
      {isLoading && <Loading />}
      {children}
    </Context.Provider>
  );
}
