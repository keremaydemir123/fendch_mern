import ProjectCard from './ProjectCard';

export default {
  title: 'Project Card',
  component: ProjectCard,
};

// example video: https://www.youtube.com/watch?v=FUKpWgRyPlU
export const Default = () => <ProjectCard />;
export const Grid = () => <ProjectCard layout="grid" />;
export const List = () => <ProjectCard layout="list" />;
