import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import ChallengeCard from '../../components/ChallengeCard';
import Input from '../../components/Input';
import { getChallenge, updateChallenge } from '../../services/challenges';
import { ChallengeProps } from '../../types/Challenge';

function AdminChallengeEdit() {
  const [newChallenge, setNewChallenge] = useState<ChallengeProps>({
    tech: '',
    objective: '',
    description: '',
    tasks: [],
    tags: [],
    week: 0,
    startDate: '',
    liveExample: '',
  });

  const { id } = useParams();

  const {
    isLoading,
    error,
    data: challenge,
  } = useQuery<ChallengeProps>(['challenge', id], () => getChallenge(id!), {
    onSuccess: (data) => {
      setNewChallenge(data);
    },
  });

  if (!id) return <div>Challenge not found</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            value={newChallenge.tech}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, tech: e.target.value })
            }
          />
          <Input
            type="text"
            id="objective"
            label="Objective"
            value={newChallenge.objective}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, objective: e.target.value })
            }
          />
          <Input
            type="text"
            id="tasks"
            label="Tasks"
            placeholder="comma seperated values"
            value={newChallenge.tasks.join(', ')}
            onChange={(e) =>
              setNewChallenge({
                ...newChallenge,
                tasks: e.target.value.split(', '),
              })
            }
          />
          <Input
            type="text"
            id="tags"
            label="Tags"
            placeholder="comma seperated values"
            value={newChallenge.tags.join(', ')}
            onChange={(e) =>
              setNewChallenge({
                ...newChallenge,
                tags: e.target.value.split(', '),
              })
            }
          />
          <Input
            type="text"
            id="description"
            label="Description"
            value={newChallenge.description}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, description: e.target.value })
            }
          />
          <Input
            type="number"
            id="week"
            label="week"
            value={newChallenge.week.toString()}
            onChange={(e) =>
              setNewChallenge({
                ...newChallenge,
                week: parseInt(e.target.value),
              })
            }
          />
          <Input
            type="date"
            id="startDate"
            label="Start Date"
            value={newChallenge.startDate}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, startDate: e.target.value })
            }
          />
          <Input
            type="text"
            id="liveExample"
            label="Live Example"
            value={newChallenge.liveExample}
            onChange={(e) =>
              setNewChallenge({ ...newChallenge, liveExample: e.target.value })
            }
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
