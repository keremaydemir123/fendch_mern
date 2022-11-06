import { useRef } from 'react';
import { useQuery } from 'react-query';
import Button from '../components/Button';
import { createChallenge, getSecretChallenges } from '../services/admin';
import { getActiveChallenges, getOldChallenges } from '../services/challenges';

function SmallCard({ challenge }: { color?: string; challenge?: any }) {
  return (
    <div className={`w-64 bg-red p-4`}>
      <h1>Small Card</h1>
      <h1>
        {challenge.tech} : {challenge.title}
      </h1>
      <h1>isSecret: {challenge.isSecret.toString()}</h1>
      <h1>isActive: {challenge.isActive.toString()}</h1>
    </div>
  );
}

function Admin() {
  const techRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const tasksRef = useRef<HTMLInputElement | null>(null);

  const { data: oldChallenges } = useQuery('oldChallenges', () =>
    getOldChallenges()
  );
  const { data: activeChallenges } = useQuery('activeChallenges', () =>
    getActiveChallenges()
  );
  const { data: secretChallenges } = useQuery('secretChallenges', () =>
    getSecretChallenges()
  );

  console.log(oldChallenges);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tech = techRef.current?.value;
    const description = descriptionRef.current?.value;
    const tags = tagsRef.current?.value.split(',');
    const tasks = tasksRef.current?.value.split(',');

    if (!tech || !description || !tags || !tasks) {
      return;
    }

    const challenge = await createChallenge({ tech, description, tags, tasks });
    console.log(challenge);
  };

  return (
    <div className="w-full h-full flex justify-around">
      <div className="w-64 bg-purple p-4 ">
        <h1>Create Challenge</h1>
        <form
          className="flex flex-col gap-1 text-primary"
          onSubmit={handleSubmit}
        >
          <label htmlFor="tech">Tech</label>
          <input type="text" name="tech" id="tech" ref={techRef} />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            ref={descriptionRef}
          />

          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="comma seperated values"
            ref={tagsRef}
          />

          <label htmlFor="tasks">Tasks</label>
          <input
            type="text"
            name="tasks"
            id="tasks"
            placeholder="comma seperated values"
            ref={tasksRef}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>

      <div className="">
        <h1>Old Challenges</h1>
        <div className="flex flex-col gap-4">
          {oldChallenges?.map((challenge: any) => (
            <SmallCard challenge={challenge} />
          ))}
        </div>
      </div>

      <div className="">
        <h1>Active Challenges</h1>
        <div className="flex flex-col gap-4">
          {activeChallenges?.map((challenge: any) => (
            <SmallCard challenge={challenge} />
          ))}
        </div>
      </div>

      <div className="">
        <h1>Upcoming Challenges</h1>
        <div className="flex flex-col gap-4">
          {secretChallenges?.map((challenge: any) => (
            <SmallCard challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
