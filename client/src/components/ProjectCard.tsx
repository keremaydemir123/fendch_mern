import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

function ProjectCard() {
  //! NEED THEESE
  const week = 'week 1';
  const submittedAt = 'Submitted at: 24.10.2022';
  const username = 'keremaydemir123';
  const challengeId = '1';
  const tech = 'React';
  const taskSummary = 'Create a project card component';
  const projectId = '1';
  const git = 'abc';

  const [open, setOpen] = useState(false);

  const seePreview = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col rounded-xl bg-gray overflow-hidden md:w-[700px] w-5/6 h-max shadow-lg shadow-secondary">
      <div className="flex justify-between bg-primary text-gray-50 p-2 border-b-secondary border-b-2">
        <Link to={`/profile/${username}`}>@{username}</Link>
        <p className="text-sm text-muted">{submittedAt}</p>
      </div>
      <div className="flex flex-col justify-between text-gray-50 p-2">
        <div className="flex justify-between">
          <p className="uppercase font-semibold text-muted text-sm">{week}</p>
        </div>
        <div className="flex justify-between">
          <Link to={`/challenges/${challengeId}`} className="text-xl">
            {tech} : {taskSummary}
          </Link>
        </div>
      </div>
      <div className="flex justify-between text-gray-50 p-2 items-center">
        <a href={git} target="_blank" rel="noreferrer">
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
