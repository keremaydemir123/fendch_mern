import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import ChallengeCard from '../../components/ChallengeCard';
import Input from '../../components/Input';
import { getChallenge, updateChallenge } from '../../services/challenges';
import { ChallengeProps } from '../../types/Challenge';

function AdminChallengeEdit() {
  const { id } = useParams();
  if (!id) return <div>Challenge not found</div>;

  const {
    isLoading,
    error,
    data: challenge,
  } = useQuery<ChallengeProps>('challenge', () => getChallenge(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  const [tech, setTech] = useState(challenge?.tech);
  const [objective, setObjective] = useState(challenge?.objective);
  const [tasks, setTasks] = useState(challenge?.tasks.join(','));
  const [description, setDescription] = useState(challenge?.description);
  const [tags, setTags] = useState(challenge?.tags.join(','));
  const [week, setWeek] = useState(challenge?.week.toString());
  const [startDate, setStartDate] = useState(challenge?.startDate);
  const [liveExample, setLiveExample] = useState(challenge?.liveExample);

  let newChallenge: ChallengeProps = {
    tech: tech || '',
    objective: objective || '',
    tasks: tasks ? tasks.split(',') : [],
    description: description || '',
    tags: tags ? tags.split(',') : [],
    week: Number(week) || 0,
    startDate: startDate || '',
    liveExample: liveExample || '',
  };

  const seePreview = () => {
    if (
      !tech ||
      !objective ||
      !description ||
      !tags ||
      !tasks ||
      !week ||
      !startDate ||
      !liveExample
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    newChallenge = {
      tech,
      objective,
      description,
      tasks: tasks.split(','),
      tags: tags.split(','),
      week: Number(week),
      startDate,
      liveExample,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    seePreview();
    try {
      await updateChallenge(id, newChallenge);
      toast.success('Challenge updated successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="h-full w-full flex justify-center gap-8">
      <Toaster />
      <div className="bg-secondary p-8 my-4">
        <h1 className=" border-b-4 border-light">Edit</h1>
        <form className="flex flex-col w-96 gap-1 mt-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            id="tech"
            label="Tech"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
          />
          <Input
            type="text"
            id="objective"
            label="Objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
          <Input
            type="text"
            id="tasks"
            label="Tasks"
            placeholder="comma seperated values"
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
          />
          <Input
            type="text"
            id="tags"
            label="Tags"
            placeholder="comma seperated values"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <Input
            type="text"
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="number"
            id="week"
            label="week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          />
          <Input
            type="date"
            id="startDate"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="text"
            id="liveExample"
            label="Live Example"
            value={liveExample}
            onChange={(e) => setLiveExample(e.target.value)}
          />
          <Button type="submit" className="mt-2 border-green">
            Submit Challenge
          </Button>
        </form>
      </div>
      <div className=" bg-secondary p-8 my-4">
        <h1 className="border-b-4 border-light mb-8">Preview</h1>
        <ChallengeCard challenge={newChallenge} />
      </div>
    </div>
  );
}

export default AdminChallengeEdit;
