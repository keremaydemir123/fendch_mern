import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Loading from '../components/Loading';
import MarkdownTest from '../components/MarkdownTest';
import Modal from '../components/Modal';
import { Select, SelectOption } from '../components/Select';
import Textarea from '../components/Textarea';
import YoutubePlayer from '../components/YoutubePlayer';
import { useChallenge } from '../contexts/ChallengeProvider';
import { useComment } from '../contexts/CommentProvider';
import { useUser } from '../contexts/UserProvider';
import { createComment, getCommentsByChallengeId } from '../services/comments';
import { createProject } from '../services/projects';
import { getRepos } from '../services/user';
import { GithubRepoAPIResults, Repo } from '../types/User';
import tagsSelectValues from '../constants/tags';
import GradientTitle from '../components/GradientTitle';

const tagsSelectOptions = tagsSelectValues.map((tag) => {
  return { label: tag, value: tag };
});

function ChallengeDetails() {
  const { user } = useUser();
  const { challenge } = useChallenge();
  const { onCommentsSet, rootComments, createLocalComment } = useComment();
  const { id: challengeId } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [git, setGit] = useState<SelectOption>();
  const [desc, setDesc] = useState<string>('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [tags, setTags] = useState<SelectOption[]>([tagsSelectOptions[0]]);

  const { error: commentError, isLoading: commentLoading } = useQuery(
    ['comments', challengeId],
    () => getCommentsByChallengeId(challengeId as string),
    {
      onSuccess: (data) => {
        onCommentsSet(data);
      },
    }
  );

  useQuery(
    ['repos', user?.repos_url],
    () => getRepos(user?.repos_url as string),
    {
      onSuccess: (data) => {
        const publicRepos = data.filter(
          (repo: GithubRepoAPIResults) => !repo.private
        );
        const reposArr = publicRepos.map((repo: GithubRepoAPIResults) => ({
          name: repo.name,
          html_url: repo.html_url,
        }));
        setRepos(reposArr);
      },
    }
  );

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  if (commentError) {
    toast.error('Something went wrong');
  }
  if (commentLoading) {
    return <Loading />;
  }

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!git || !desc) {
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
      await createProject({
        challengeId,
        markdown: desc,
        git: git.value,
        tags: tags.map((tag) => tag.value),
        userId: user._id,
      });
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

  const selectOptions = repos.map((repo) => {
    return { label: repo.name, value: repo.html_url };
  });

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Select
              options={selectOptions}
              multiple={false}
              value={git}
              onChange={(option) => setGit(option)}
              label="Github Repo"
            />
            <Select
              options={tagsSelectOptions}
              multiple
              value={tags}
              onChange={(option) => setTags(option)}
              label="Tags"
            />
          </div>
          <Textarea
            label="Description"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="h-96"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
      <div className="w-full flex flex-col items-center mb-4 shadow-lg shadow-dark">
        <Toaster />
        <div className="w-full rounded-lg bg-primary bg-opacity-90 p-8">
          <div className="text-center">
            <GradientTitle className="text-6xl">
              {challenge?.tech}
            </GradientTitle>
          </div>
          <h2 className="text-center text-4xl text-tahiti text-opacity-90">
            {challenge?.objective}
          </h2>
          <h2 className="text-center text-light text-2xl mt-3">
            {challenge?.description}
          </h2>
          <section className="w-full flex justify-center mt-4">
            <p className="md:w-[800px] w-full text-center text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sit
              rerum, voluptatibus sunt distinctio vitae ullam consequatur!
              Accusantium porro totam quae quisquam dolorem repellendus iusto
              eaque aliquid maiores error, mollitia atque voluptatem ex. Vero id
              sint excepturi sapiente ab vitae culpa saepe eaque aliquam? Hic
              iusto dolores ipsam velit reprehenderit?
            </p>
          </section>
          <h1 className="text-center my-4">
            Here is the explanation video from us
          </h1>
          <YoutubePlayer embedId={challenge?.tasksVideo as string} />
          <h1 className="text-center mt-4">
            Here is the final expected result
          </h1>
          <div className="w-full flex justify-center my-4 mb-2">
            <img
              src={challenge?.thumbnail}
              alt="thumbnail"
              className="md:w-[600px] "
            />
          </div>
          <div className="w-full text-center">
            <a href={challenge?.liveExample} className="text-2xl text-tahiti">
              Click to see it on live
            </a>
          </div>
          <h1 className="my-4 text-center">
            We also have a written task for you
          </h1>
          <div className="bg-secondary p-4 rounded-md">
            <MarkdownTest markdown={challenge?.tasksMd as string} />
          </div>
          <div className="flex justify-end items-center mt-4 px-4">
            <Button className="w-48 h-12 text-lg" onClick={() => setOpen(true)}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      <GradientTitle>Comments</GradientTitle>
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
