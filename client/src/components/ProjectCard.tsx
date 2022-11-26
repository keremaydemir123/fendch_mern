import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectProps } from '../types/Project';
import dateFormatter from '../utils/dateFormatter';
import Button from './Button';
import CustomLink from './CustomLink';
import Modal from './Modal';
import { dislikeProject, likeProject } from '../services/projects';
import { useUser } from '../contexts/UserProvider';
import toast, { Toaster } from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useProject } from '../contexts/ProjectProvider';

function ProjectCard({ project }: { project: ProjectProps }) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const seePreview = () => {
    setOpen(true);
  };

  const projectUser = project.user;
  const challenge = project.challenge;

  return (
    <div className="flex flex-col rounded-xl bg-gray overflow-hidden w-full h-max shadow-lg shadow-secondary">
      <Toaster />
      <div className="flex justify-between bg-primary text-gray-50 p-2 border-b-secondary border-b-2">
        <Link to={`/profile/${projectUser.username}`}>
          @{projectUser.username}
        </Link>
        <p className="text-sm text-muted">
          {dateFormatter(new Date(project.submittedAt))}
        </p>
      </div>
      <div className="flex flex-col justify-between text-gray-50 p-2">
        <div className="flex justify-between">
          <p className="uppercase font-semibold text-muted text-sm">
            Week {challenge?.week}
          </p>
        </div>
        <div className="flex justify-between">
          <Link to={`/challenges/${challenge?._id}`} className="text-xl">
            {challenge?.tech} : {challenge?.objective}
          </Link>
        </div>
      </div>
      <div className="flex justify-between text-gray-50 p-2 items-center">
        <a href={project.git} target="_blank" rel="noreferrer">
          <span>Github Repo</span>
        </a>
        <div className="h-max">
          <CustomLink to={`/projects/${project._id}`}>
            Project Details
          </CustomLink>
          <Button onClick={seePreview} type="button">
            Preview
          </Button>
        </div>
      </div>

      {open && (
        <div className="absolute w-5/6 h-5/6 p-8 top-1/2 md:right-2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary">
          <Button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-1"
          >
            X
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <img
              src="https://picsum.photos/400"
              alt="preview"
              className="object-cover w-full h-full"
            />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
