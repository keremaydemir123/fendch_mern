import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Input from '../components/Input';
import MarkdownTest from '../components/MarkdownTest';
import Modal from '../components/Modal';
import Textarea from '../components/Textarea';
import YoutubePlayer from '../components/YoutubePlayer';
import { useChallenge } from '../contexts/ChallengeProvider';
import { useUser } from '../contexts/UserProvider';
import { createComment } from '../services/comments';
import { createProject } from '../services/projects';

function ChallengeDetails() {
  const { user } = useUser();
  const { challenge, createLocalComment, rootComments } = useChallenge();
  const { id: challengeId } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);

  const gitRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

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
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const onCommentCreate = async (message: string) => {
    try {
      const comment = await createComment({
        challengeId: challengeId!,
        message,
        userId: user?._id!,
      });
      createLocalComment(comment);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const mdText = `
  # Heading 1
  sdasdasda
  asdasd
  ## Heading 2
  asda
  ~~~js
  console.log('hello world') 
  ~~~
  `;

  return (
    <div className="wrapper">
      <div className="w-full flex flex-col items-center mb-4">
        <Toaster />
        <div className="w-full rounded-lg bg-primary p-8">
          <h1 className="text-center">{challenge?.tech}</h1>
          <h3 className="text-center">{challenge?.objective}</h3>
          <MarkdownTest markdown={mdText} />
          {/* <div className="p-8">
            <YoutubePlayer embedId="E1E08i2UJGI" />
          </div> */}
          <div className="text-right px-8">
            <Button onClick={() => setOpen(true)}>Submit</Button>
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
              <Input label="Git" id="git" type="text" ref={gitRef} />
              <Textarea label="Description" id="desc" ref={descriptionRef} />
              <Button type="submit">Submit</Button>
            </form>
          </Modal>
        </div>
      </div>
      <h1>Comments</h1>
      <CommentForm onSubmit={onCommentCreate} />
      <div>
        {rootComments != null && rootComments.length > 0 && (
          <CommentList comments={rootComments} place="challenge" />
        )}
      </div>
    </div>
  );
}

export default ChallengeDetails;
