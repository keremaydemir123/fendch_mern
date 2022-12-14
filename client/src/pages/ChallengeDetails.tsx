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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const gitRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const git = gitRef.current?.value;
    const markdown = descriptionRef.current?.value;

    if (!git || !markdown) {
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
      await createProject({ challengeId, markdown, git, userId: user._id });
      toast.success('Project submitted successfully');
      setOpen(false);
    } catch (err: unknown) {
      toast.error("Couldn't submit project");
    }
  };

  const onCommentCreate = async (message: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const comment = await createComment({
        challengeId: challengeId as string,
        message,
        userId: user?._id as string,
      });
      createLocalComment(comment);
      setLoading(false);
    } catch (err: unknown) {
      toast.error("Couldn't create comment");
      setError('Something went wrong');
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
          <Input label="Git" type="text" ref={gitRef} />
          <Textarea label="Description" id="desc" ref={descriptionRef} />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
      <div className="w-full flex flex-col items-center mb-4">
        <Toaster />
        <div className="w-full rounded-lg bg-primary p-8">
          <h1 className="text-center">{challenge?.tech}</h1>
          <h3 className="text-center">{challenge?.objective}</h3>
          <img src={challenge?.thumbnail} alt="thumbnail" />
          <div className="p-8">
            <YoutubePlayer embedId={challenge?.tasksVideo as string} />
          </div>
          <MarkdownTest markdown={challenge?.tasksMd as string} />
          <div className="text-right px-8">
            <Button onClick={() => setOpen(true)}>Submit</Button>
          </div>
        </div>
      </div>
      <h1>Comments</h1>
      <CommentForm onSubmit={onCommentCreate} loading={loading} error={error} />
      <div>
        {rootComments != null && rootComments.length > 0 && (
          <CommentList comments={rootComments} place="challenge" />
        )}
      </div>
    </>
  );
}

export default ChallengeDetails;
