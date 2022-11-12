import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProject } from '../services/projects';

function ProjectDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    error,
    data: project,
  } = useQuery(['project', id], () => getProject(id!));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return <div className="w-full bg-red">Project Details</div>;
}

export default ProjectDetails;
