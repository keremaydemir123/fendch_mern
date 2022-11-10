import { useQuery } from 'react-query';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/projects';
import { ProjectProps } from '../types/Project';

function Projects() {
  const {
    isLoading,
    error,
    data: projects,
  } = useQuery('projects', getProjects);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="w-full flex flex-col gap-4 items-center my-8">
      {projects.map((project: ProjectProps) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}

export default Projects;
