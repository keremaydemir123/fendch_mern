import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button';
import ChallengeCard from '../../components/ChallengeCard';
import Input from '../../components/Input';
import { createChallenge } from '../../services/admin';
import { ChallengeProps } from '../../types/Challenge';

function AdminCreateChallenge() {
  const techRef = useRef<HTMLInputElement | null>(null);
  const objectiveRef = useRef<HTMLInputElement | null>(null);
  const tasksRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const weekRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const liveExampleRef = useRef<HTMLInputElement | null>(null);

  const [challenge, setChallenge] = useState<ChallengeProps>({
    tech: '',
    objective: '',
    tasks: [],
    description: '',
    tags: [],
    week: 0,
    startDate: '',
    liveExample: '',
  });

  const seePreview = async () => {
    const tech = techRef.current?.value;
    const objective = objectiveRef.current?.value;
    const description = descriptionRef.current?.value;
    const tasks = tasksRef.current?.value.split(',');
    const tags = tagsRef.current?.value.split(',');
    const week = Number(weekRef.current?.value);
    const startDate = startDateRef.current?.value;
    const liveExample = liveExampleRef.current?.value;

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

    setChallenge({
      tech,
      objective,
      description,
      tasks,
      tags,
      week,
      startDate,
      liveExample,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    seePreview();
    try {
      await createChallenge(challenge);
      toast.success('Challenge created successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="w-full flex bg-primary p-4 justify-center gap-8">
      <Toaster />
      <div className="w-96 bg-secondary p-8">
        <h1 className="border-b-2 border-light mb-2">Create Challenge</h1>
        <form
          className="flex flex-col gap-1 text-primary"
          onSubmit={handleSubmit}
        >
          <Input type="text" id="tech" label="Tech" ref={techRef} />
          <Input
            type="text"
            id="objective"
            label="Objective"
            ref={objectiveRef}
          />
          <Input
            type="text"
            id="tasks"
            label="Tasks"
            placeholder="comma seperated values"
            ref={tasksRef}
          />
          <Input
            type="text"
            id="tags"
            label="Tags"
            placeholder="comma seperated values"
            ref={tagsRef}
          />
          <Input
            type="text"
            id="description"
            label="Description"
            ref={descriptionRef}
          />
          <Input type="number" id="week" label="week" ref={weekRef} />
          <Input
            type="date"
            id="startDate"
            label="Start Date"
            ref={startDateRef}
          />
          <Input
            type="text"
            id="liveExample"
            label="Live Example"
            ref={liveExampleRef}
          />

          <Button
            type="button"
            onClick={() => seePreview()}
            className="mt-2 border-blue"
          >
            See Preview
          </Button>
          <Button type="submit" className="mt-2 border-green">
            Submit Challenge
          </Button>
        </form>
      </div>
      <div className=" bg-secondary p-8">
        <h1 className="border-b-2 border-light mb-8">Preview</h1>
        <ChallengeCard challenge={challenge} />
      </div>
    </div>
  );
}

export default AdminCreateChallenge;
