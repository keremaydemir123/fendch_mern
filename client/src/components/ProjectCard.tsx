import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProjectProps } from '../types/Project';
import dateFormatter from '../utils/dateFormatter';
import Button from './Button';
import CustomLink from './CustomLink';
import GradientTitle from './GradientTitle';
import LogoContainer from './LogoContainer';
import CustomCTA from './CustomCTA';

function ProjectCardDefault({ project }: { project: ProjectProps }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 bg-primary p-4 rounded-lg w-64 h-80 shadow-lg shadow-dark"
    >
      <div className="flex items-center gap-4">
        <img
          src={project?.user?.avatar}
          alt="user"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <Link to={`/profile/${project?.user?.username}`}>
            {project?.user?.username}
          </Link>
          <span className="text-light-gray text-sm">
            {dateFormatter(new Date(project?.submittedAt))}
          </span>
        </div>
      </div>
      <div className="h-full">
        <GradientTitle>{project?.challenge?.tech}</GradientTitle>
        <Link to={`/projects/${project?._id}`}>
          <h3>{project?.challenge?.objective}</h3>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        {project?.tags?.length > 0 && (
          <LogoContainer tags={project?.tags} className="w-full" />
        )}
        <div className="flex items-center justify-between gap-1">
          <CustomLink to={`/projects/${project?._id}`}>
            {project?.likes?.length} Likes
          </CustomLink>
          <CustomCTA href={project?.git}>
            <FaGithub />
            Repo
          </CustomCTA>
          <CustomLink to={`/projects/${project?._id}`}>Details</CustomLink>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCardList({ project }: { project: ProjectProps }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-2 bg-primary p-4 rounded-lg w-full shadow-lg shadow-dark"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={project?.user?.avatar}
            alt="user"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <Link to={`/profile/${project?.user?.username}`}>
              {project?.user?.username}
            </Link>
            <span className="text-light-gray text-sm">
              {dateFormatter(new Date(project?.submittedAt))}
            </span>
          </div>
        </div>
        {project?.tags.length > 0 && <LogoContainer tags={project?.tags} />}
      </div>
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <GradientTitle>{project?.challenge?.tech}</GradientTitle>
          <Link to={`/challenges/${project?.challenge?._id}`}>
            <h3>{project?.challenge?.objective}</h3>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button>{project?.likes?.length} Likes</Button>
          <CustomCTA href={project?.git}>
            <FaGithub />
            Repo
          </CustomCTA>
          <CustomLink to={`/projects/${project?._id}`}>Details</CustomLink>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  layout,
}: {
  project: ProjectProps;
  layout?: 'default' | 'list';
}) {
  if (layout === 'list') return <ProjectCardList project={project} />;

  return <ProjectCardDefault project={project} />;
}

ProjectCard.defaultProps = {
  layout: 'default',
};

export default ProjectCard;
