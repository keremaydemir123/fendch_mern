import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import { ProjectProps } from '../types';
import { getProject } from '../services/projects';
import { useUser } from './UserProvider';

interface IProjectContext {
  project: ProjectProps | undefined;
  likeLocalProject: (projectId: string) => void;
  dislikeLocalProject: (projectId: string) => void;
  updateLocalProjectMarkdown: (markdown: string) => void;
}

const Context = createContext<IProjectContext>({} as IProjectContext);

export function useProject() {
  return useContext(Context);
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const { user: currentUser } = useUser();
  const [project, setProject] = useState<ProjectProps>({} as ProjectProps);

  const { isLoading, error } = useQuery<ProjectProps>(
    ['getProject', id],
    () => getProject(id),
    {
      onSuccess: (data) => {
        setProject({
          ...data,
          likeCount: data.likes.length,
          likedByMe: data.likes.includes(currentUser?._id as string),
        });
      },
    }
  );

  const likeLocalProject = useCallback(() => {
    setProject((prev) => {
      return {
        ...prev,
        likeCount: project.likeCount + 1,
        likedByMe: true,
      };
    });
  }, [project]);

  const dislikeLocalProject = useCallback(() => {
    setProject((prev) => {
      return {
        ...prev,
        likeCount: project.likeCount - 1,
        likedByMe: false,
      };
    });
  }, [project]);

  function updateLocalProjectMarkdown(markdown: string) {
    setProject((prev) => {
      return { ...prev, markdown };
    });
  }

  const contextValues = useMemo(
    () => ({
      project,
      likeLocalProject,
      dislikeLocalProject,
      updateLocalProjectMarkdown,
    }),
    [project, dislikeLocalProject, likeLocalProject]
  );

  return (
    <Context.Provider value={contextValues}>
      <>
        {isLoading && <Loading />}
        {error && <h1 className="text-red">Project could&apos;t found</h1>}
        {children}
      </>
    </Context.Provider>
  );
}
