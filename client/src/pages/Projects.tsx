import ProjectCard from '../components/ProjectCard';

function Projects() {
  return (
    <div className="w-full flex flex-col gap-4 items-center my-8">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
}

export default Projects;
