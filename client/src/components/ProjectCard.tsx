import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getChallenge } from '../services/challenges';
import { getUser } from '../services/user';
import { ProjectProps } from '../types/Project';
import dateFormatter from '../utils/dateFormatter';
import Button from './Button';

function ProjectCard({ project }: { project: ProjectProps }) {
  const [open, setOpen] = useState(false);

  const seePreview = () => {
    setOpen(true);
  };

  console.log(project);

  const {
    isLoading: loadingChallenge,
    error: errorChallenge,
    data: challenge,
  } = useQuery(['challenge', project.challengeId], () =>
    getChallenge(project.challengeId)
  );
  const {
    isLoading: loadingUser,
    error: errorUser,
    data: user,
  } = useQuery(['user', project.userId], () => getUser(project.userId));

  if (loadingChallenge || loadingUser) return <p>Loading...</p>;
  if (errorChallenge || errorUser) return <p>Error</p>;

  console.log('user: ', user);
  console.log('challenge: ', challenge);

  return (
    <div className="flex flex-col rounded-xl bg-gray overflow-hidden md:w-[700px] w-5/6 h-max shadow-lg shadow-secondary">
      <div className="flex justify-between bg-primary text-gray-50 p-2 border-b-secondary border-b-2">
        <Link to={`/profile/${user.username}`}>@{user.username}</Link>
        <p className="text-sm text-muted">{'sda'}</p>
      </div>
      <div className="flex flex-col justify-between text-gray-50 p-2">
        <div className="flex justify-between">
          <p className="uppercase font-semibold text-muted text-sm">
            {challenge.week}
          </p>
        </div>
        <div className="flex justify-between">
          <Link to={`/challenges/${challenge._id}`} className="text-xl">
            {challenge.tech} : {challenge.objective}
          </Link>
        </div>
      </div>
      <div className="flex justify-between text-gray-50 p-2 items-center">
        <a href={project.git} target="_blank" rel="noreferrer">
          <span>Github Repo</span>
        </a>
        <Button onClick={seePreview} type="button">
          Preview
        </Button>
      </div>

      {open && (
        <div className="absolute w-5/6 h-5/6 p-8 top-1/2 md:right-2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary">
          <Button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-1"
          >
            X
          </Button>
          <img
            src="https://picsum.photos/400"
            alt="preview"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
