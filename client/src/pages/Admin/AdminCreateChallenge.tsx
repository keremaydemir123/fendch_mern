import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button';
import ChallengeCard from '../../components/ChallengeCard';
import Input from '../../components/Input';
import { createChallenge } from '../../services/admin';
import { SelectOption, Select } from '../../components/Select';

const SelectOptions = [
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
    tags: [SelectOptions[0].value],
    week: 0,
    liveExample: '',
    thumbnail: '',
  });
  const [selectValue, setSelectValue] = useState<SelectOption[]>([
    SelectOptions[0],
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createChallenge(challenge);
      toast.success('Challenge created successfully!');
    } catch (error) {
      console.log(error);
      toast.error("Couldn't create challenge");
    }
  };

  // handle file import
  let fileReader: FileReader;
  const handleFileRead = () => {
    const content = fileReader.result;
    if (content?.toString().startsWith('## Solution')) {
      setChallenge({
        ...challenge,
        solutionMd: content.toString(),
      });
    }
    if (content?.toString().startsWith('## Tasks')) {
      setChallenge({
        ...challenge,
        tasksMd: content.toString(),
      });
    }
  };

  const handleFileChosen = (file: File) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="mt-8 flex flex-col gap-4 items-center justify-center bg-purple p-4 rounded-lg">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-secondary p-8 flex flex-col gap-2"
      >
        <h1>Create Challenge</h1>
        <Input
          label="Tech"
          type="text"
          value={challenge?.tech}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              tech: e.target.value,
            })
          }
        />
        <Input
          label="Objective"
          type="text"
          value={challenge?.objective}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              objective: e.target.value,
            })
          }
        />
        <Input
          label="Description"
          type="text"
          value={challenge?.description}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              description: e.target.value,
            })
          }
        />
        <Select
          multiple
          value={selectValue}
          options={SelectOptions}
          onChange={(values: SelectOption[]) => {
            const tags: string[] = [];
            values.forEach((value) => tags.push(value.value as string));
            setSelectValue(values);
            setChallenge({ ...challenge, tags });
          }}
        />
        <Input
          label="Tasks Markdown"
          type="file"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.item(0);
            if (file) {
              handleFileChosen(file);
            }
          }}
        />
        <Input
          label="Tasks Video"
          type="text"
          value={challenge?.tasksVideo}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              tasksVideo: e.target.value,
            })
          }
        />
        <Input
          label="Solution Markdown"
          type="file"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.item(0);
            if (file) {
              handleFileChosen(file);
            }
          }}
        />
        <Input
          label="Live Example"
          type="text"
          value={challenge?.liveExample}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              liveExample: e.target.value,
            })
          }
        />
        <Input
          label="Solution Video"
          type="text"
          value={challenge?.solutionVideo}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              solutionVideo: e.target.value,
            })
          }
        />
        <Input
          label="Week"
          type="number"
          value={challenge?.week.toString()}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              week: Number(e.target.value),
            })
          }
        />
        <Input
          label="Thumbnail"
          type="text"
          value={challenge?.thumbnail}
          onChange={(e) =>
            setChallenge({
              ...challenge,
              thumbnail: e.target.value,
            })
          }
        />
        <Button type="submit">Submit</Button>
      </form>

      <div className=" bg-secondary p-8 flex flex-col items-center gap-2 w-full">
        <h1>Challenge Preview</h1>
        <ChallengeCard challenge={challenge} />
        <ChallengeCard challenge={challenge} layout="grid" />
        <ChallengeCard challenge={challenge} layout="list" />
      </div>
    </div>
  );
}

export default AdminCreateChallenge;
