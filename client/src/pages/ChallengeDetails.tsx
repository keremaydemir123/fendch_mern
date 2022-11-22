import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Textarea from '../components/Textarea';
import YoutubePlayer from '../components/YoutubePlayer';
import { useUser } from '../contexts/UserProvider';
import { createProject } from '../services/projects';

function ChallengeDetails() {
  const { user } = useUser();
  const { id: challengeId } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);

  const gitRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  type ProjectDataProps = {
    git: string;
    description: string;
    challengeId: string;
    userId: string;
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const git = gitRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!git || !description) {
      toast.error('Please fill all the fields');
      return;
    }

    if (!user?._id) {
      toast.error('Please login to submit your project');
      return;
    }

    if (!challengeId) {
      toast.error('You are not in a challenge');
      return;
    }

    try {
      await createProject({ challengeId, description, git, userId: user._id });
      toast.success('Project submitted successfully');
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Toaster />
      <div className="w-[700px] rounded-lg my-16 bg-gray p-20">
        <h1 className="text-center">Title</h1>
        <YoutubePlayer embedId="E1E08i2UJGI" />
        <Button onClick={() => setOpen(true)}>Submit</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
            <Input label="Git" id="git" type="text" ref={gitRef} />
            <Textarea label="Description" id="desc" ref={descriptionRef} />
            <Button type="submit">Submit</Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default ChallengeDetails;
