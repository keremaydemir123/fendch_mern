import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import MarkdownTest from '../components/MarkdownTest';
import Textarea from '../components/Textarea';
import { useProject } from '../contexts/ProjectProvider';
import { useUser } from '../contexts/UserProvider';
import { createProjectComment } from '../services/comments';
import {
  dislikeProject,
  likeProject,
  updateProjectMarkdown,
} from '../services/projects';

function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const {
    project,
    createLocalComment,
    dislikeLocalProject,
    likeLocalProject,
    rootComments,
    updateLocalProjectMarkdown,
  } = useProject();

  const [markdown, setMarkdown] = useState(project?.markdown);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    } catch (err) {
      toast.error("Couldn't create comment");
      setError("Couldn't create comment");
    }
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
      setOpen(false);
      updateLocalProjectMarkdown(markdown as string);
    } catch (err) {
      console.log("Couldn't update markdown");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Toaster />
      <h1>Project Details</h1>
      <div className="w-full h-96 min-h-max bg-secondary rounded-md flex flex-col justify-between">
        <div className="h-full p-2">
          {open ? (
            <Textarea
              value={markdown}
              className="h-full"
              onChange={(e) => setMarkdown(e.target.value)}
            />
          ) : (
            <MarkdownTest markdown={markdown as string} />
          )}
        </div>
        <div className="bg-primary h-max p-2 flex justify-between items-center">
          <div>
            {user && user._id === project?.user && (
              <div>
                <Button
                  type="button"
                  onClick={
                    open
                      ? () => submitEditedMarkdown(markdown as string)
                      : () => setOpen(true)
                  }
                >
                  {open ? 'Submit' : 'Edit'}
                </Button>
                {open && (
                  <Button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setMarkdown(project?.markdown as string);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            )}
          </div>
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
      <h1>Comments</h1>
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
