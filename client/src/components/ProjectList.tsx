import { ProjectProps } from '../types';
import ProjectCard from './ProjectCard';

function ProjectList({ projects }: { projects: ProjectProps[] }) {
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id} className="comment-stack my-4">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
