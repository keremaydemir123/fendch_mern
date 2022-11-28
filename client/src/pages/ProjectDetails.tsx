import { useState } from 'react';
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

  const [markdown, setMarkdown] = useState(project.markdown);

  const onCommentCreate = async (message: string) => {
    try {
      const comment = await createProjectComment({
        projectId: id!,
        message,
        userId: user?._id!,
      });
      createLocalComment(comment);
    } catch (error) {}
  };

  const onProjectLike = async () => {
    if (!user) return;
    try {
      likeLocalProject(id!);
      await likeProject({
        projectId: id!,
        userId: user?._id!,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onProjectDislike = async () => {
    if (!user) return;
    try {
      dislikeLocalProject(id!);
      await dislikeProject({
        projectId: id!,
        userId: user?._id!,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitEditedMarkdown = async (markdown: string) => {
    try {
      await updateProjectMarkdown({
        projectId: id!,
        markdown,
      });
      setMarkdown(markdown);
      setOpen(false);
      updateLocalProjectMarkdown(markdown);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="w-full flex flex-col">
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
              <MarkdownTest markdown={markdown} />
            )}
          </div>
          <div className="bg-primary h-max p-2 flex justify-between items-center">
            <div>
              {user && user._id === project.user && (
                <div>
                  <Button
                    type="button"
                    onClick={
                      open
                        ? () => submitEditedMarkdown(markdown)
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
                        setMarkdown(project.markdown);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
            {project.likedByMe ? (
              <Button onClick={onProjectDislike}>
                Dislike {project.likeCount}
              </Button>
            ) : (
              <Button onClick={onProjectLike}>Like {project.likeCount}</Button>
            )}
          </div>
        </div>
        <h1>Comments</h1>
        {user && <CommentForm onSubmit={onCommentCreate} />}
        <div>
          {rootComments != null && rootComments.length > 0 && (
            <CommentList comments={rootComments} place="project" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
