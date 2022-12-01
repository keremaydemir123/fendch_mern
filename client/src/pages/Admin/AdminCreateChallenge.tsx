import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button';
import ChallengeCard from '../../components/ChallengeCard';
import Input from '../../components/Input';
import { createChallenge } from '../../services/admin';
import { Select } from '../../components/Select';

const tagOptions = [
  { value: 'react', label: 'React' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

function AdminCreateChallenge() {
  const [challenge, setChallenge] = useState({
    tech: '',
    objective: '',
    description: '',
    tasksMd: '',
    tasksVideo: '',
    solutionMd: '',
    solutionVideo: '',
    tags: [],
    week: 0,
    liveExample: '',
    thumbnail: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createChallenge(challenge);
      toast.success('Challenge created successfully!');
    } catch (error) {
      console.log(error);
      toast.error("Couldn't create challenge");
    }
  };

  // handle file import
  let fileReader: any;
  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content);
  };

  const handleFileChosen = (file: any) => {
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="mt-8 flex gap-4">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-secondary p-8 flex flex-col gap-2"
      >
        <h1>Create Challenge</h1>
        <Input
          label="Tech"
          id="tech"
          type="text"
          value={challenge.tech}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              tech: e.target.value,
            })
          }
        />
        <Input
          label="Objective"
          id="objective"
          type="text"
          value={challenge.objective}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              objective: e.target.value,
            })
          }
        />
        <Input
          label="Description"
          id="desc"
          type="text"
          value={challenge.description}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              description: e.target.value,
            })
          }
        />
        <Select
          multiple
          value={[tagOptions[0]]}
          options={tagOptions}
          onChange={(value) => setChallenge({ ...challenge, tags: value })}
        />
        <Input
          label="Tasks Markdown"
          id="tasksMd"
          type="file"
          value={challenge.tasksMd}
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
        <Input
          label="Tasks Video"
          id="tasksVideo"
          type="text"
          value={challenge.tasksVideo}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              tasksVideo: e.target.value,
            })
          }
        />
        <Input
          label="Solution Markdown"
          id="solutionMd"
          type="file"
          value={challenge.solutionMd}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              solutionMd: e.target.value,
            })
          }
        />
        <Input
          label="Live Example"
          id="liveExample"
          type="text"
          value={challenge.liveExample}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              liveExample: e.target.value,
            })
          }
        />
        <Input
          label="Solution Video"
          id="solutionVideo"
          type="text"
          value={challenge.solutionVideo}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              solutionVideo: e.target.value,
            })
          }
        />
        <Input
          label="Week"
          id="week"
          type="number"
          value={challenge.week.toString()}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              week: Number(e.target.value),
            })
          }
        />
        <Input
          label="Thumbnail"
          id="thumbnail"
          type="text"
          value={challenge.thumbnail}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              thumbnail: e.target.value,
            })
          }
        />
        <Button type="submit">Submit</Button>
      </form>

      <div className="w-96 bg-secondary p-8 flex flex-col items-center gap-2">
        <h1>Challenge Preview</h1>
        <ChallengeCard challenge={challenge} />
      </div>
    </div>
  );
}

export default AdminCreateChallenge;
