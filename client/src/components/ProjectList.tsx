import { ProjectProps } from '../types';
import ProjectCard from './ProjectCard';

function ProjectList({
  projects,
  layout,
}: {
  projects: ProjectProps[];
  layout?: 'default' | 'list';
}) {
  console.log(projects);
  return (
    <div className="flex flex-wrap gap-4 mt-4 justify-center">
      {projects.map((project) => (
        <ProjectCard project={project} key={project._id} layout={layout} />
      ))}
    </div>
  );
}

ProjectList.defaultProps = {
  layout: 'default',
};

export default ProjectList;
