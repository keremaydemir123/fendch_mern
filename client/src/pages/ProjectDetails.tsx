import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link, useParams, redirect } from 'react-router-dom';
import Button from '../components/Button';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Loading from '../components/Loading';
import MarkdownTest from '../components/MarkdownTest';
import Textarea from '../components/Textarea';
import { useComment } from '../contexts/CommentProvider';
import { useProject } from '../contexts/ProjectProvider';
import { useUser } from '../contexts/UserProvider';
import dateFormatter from '../utils/dateFormatter';
import {
  createProjectComment,
  getCommentsByProjectId,
} from '../services/comments';
import {
  deleteProject,
  dislikeProject,
  likeProject,
  updateProjectMarkdown,
} from '../services/projects';
import { CommentProps } from '../types';
import LogoContainer from '../components/LogoContainer';
import GradientTitle from '../components/GradientTitle';
import Modal from '../components/Modal';
import Input from '../components/Input';

function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const {
    project,
    dislikeLocalProject,
    likeLocalProject,
    updateLocalProjectMarkdown,
  } = useProject();

  const { onCommentsSet, rootComments, createLocalComment } = useComment();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingMarkdown, setIsEditingMarkdown] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [markdown, setMarkdown] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { isLoading: commentIsLoading, error: commentError } = useQuery<
    CommentProps[]
  >(['getComments', id], () => getCommentsByProjectId(id as string), {
    onSuccess: (data: CommentProps[]) => {
      onCommentsSet(data);
    },
  });

  useEffect(() => {
    setMarkdown(project?.markdown as string);
    console.log('project: ', project);
  }, [project]);

  if (commentIsLoading) return <Loading />;
  if (commentError) return <div>Couldn&apos;t load comments</div>;

  const onCommentCreate = async (message: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const comment = await createProjectComment({
        projectId: id as string,
        message,
        userId: user?._id as string,
      });
      createLocalComment(comment);
    } catch (err) {
      toast.error("Couldn't create comment");
      setError("Couldn't create comment");
    }
    setLoading(false);
  };
  const onProjectLike = async () => {
    if (!user) return;
    try {
      await likeProject({
        projectId: id as string,
        userId: user?._id as string,
      });
      likeLocalProject(id as string);
    } catch (err) {
      console.log("Couldn't like project");
    }
  };
  const onProjectDislike = async () => {
    if (!user) return;
    try {
      await dislikeProject({
        projectId: id as string,
        userId: user?._id as string,
      });
      dislikeLocalProject(id as string);
    } catch (err) {
      console.log("Couldn't dislike project");
    }
  };

  const submitEditedMarkdown = async (md: string) => {
    try {
      await updateProjectMarkdown({
        projectId: id as string,
        markdown: md,
      });
      setMarkdown(markdown);
      setIsEditingMarkdown(false);
      updateLocalProjectMarkdown(markdown as string);
    } catch (err) {
      console.log("Couldn't update markdown");
    }
  };

  const handleProjectDelete = async () => {
    setIsModalOpen(false);
    if (confirmText !== 'Delete My Project') {
      toast.error('Wrong text');
      setConfirmText('');
      return;
    }
    try {
      await deleteProject(id as string);
      toast.success('Project deleted');
      redirect('/projects');
    } catch (err) {
      toast.error("Couldn't delete project");
    }
    setConfirmText('');
  };

  return (
    <div className="w-full flex flex-col">
      <Toaster />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-light-purple">Are You Sure?</h2>
        <p>
          Type <strong>Delete My Project</strong> to permanently delete project
        </p>
        <Input
          onChange={(e) => setConfirmText(e.target.value)}
          value={confirmText}
        />
        <Button onClick={handleProjectDelete} className="mt-4">
          Delete
        </Button>
      </Modal>
      <div className="w-full h-max bg-secondary shadow-lg shadow-dark mb-4 p-4 rounded-md">
        <div className="flex justify-between items-center">
          <h4 className="text-muted uppercase">
            WEEK {project?.challenge?.week}
          </h4>
          <h4 className="text-muted">
            Submitted at:{' '}
            {dateFormatter(new Date(project?.submittedAt as Date))}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <Link
            to={`/challenges/${project?.challenge?._id}`}
            className="text-lg flex items-baseline gap-2"
          >
            <h2 className="text-tahiti">{project?.challenge?.tech}</h2>
            {project?.challenge?.objective}
          </Link>
          <LogoContainer tags={project?.tags} />
        </div>
      </div>
      <div className="w-full h-96 min-h-max bg-secondary rounded-md flex flex-col justify-between shadow-lg shadow-dark overflow-hidden">
        <div className="h-full p-2">
          {isEditingMarkdown ? (
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="h-full w-full"
            />
          ) : (
            <div className="p-2">
              <MarkdownTest markdown={markdown as string} />
            </div>
          )}
        </div>
        <div className="bg-primary h-max p-4 flex justify-between items-center">
          {user && user._id === project?.user && (
            <div className="flex gap-2 items-center">
              <Button
                type="button"
                onClick={
                  isEditingMarkdown
                    ? () => submitEditedMarkdown(markdown as string)
                    : () => setIsEditingMarkdown(true)
                }
              >
                {isEditingMarkdown ? 'Submit' : 'Edit'}
              </Button>
              <Button
                className="bg-red hover:bg-red hover:bg-opacity-80"
                onClick={() => setIsModalOpen(true)}
              >
                Delete
              </Button>
              {isEditingMarkdown && (
                <Button
                  type="button"
                  onClick={() => {
                    setIsEditingMarkdown(false);
                    setMarkdown(project?.markdown as string);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          )}
          <div className="flex gap-2 items-center">
            {project?.likedByMe ? (
              <Button onClick={onProjectDislike} disabled={loading}>
                Dislike {project.likeCount}
              </Button>
            ) : (
              <Button onClick={onProjectLike} disabled={loading}>
                Like {project?.likeCount}
              </Button>
            )}
          </div>
        </div>
      </div>
      <GradientTitle className="mt-6">Comments</GradientTitle>
      {user && (
        <CommentForm
          onSubmit={onCommentCreate}
          autoFocus={false}
          loading={loading}
          error={error}
        />
      )}
      <div>
        {rootComments != null && rootComments.length > 0 && (
          <CommentList comments={rootComments} place="project" />
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
