import ProjectCard from './ProjectCard';

export default {
  title: 'Project Card',
  component: ProjectCard,
};

// example video: https://www.youtube.com/watch?v=FUKpWgRyPlU
export function Default() {
  return <ProjectCard layout="default" />;
}
export function Grid() {
  return <ProjectCard layout="grid" />;
}
export function List() {
  return <ProjectCard layout="list" />;
}
