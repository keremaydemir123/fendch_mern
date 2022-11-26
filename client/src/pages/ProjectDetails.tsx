import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { useProject } from '../contexts/ProjectProvider';
import { useUser } from '../contexts/UserProvider';
import { createProjectComment } from '../services/comments';
import { dislikeProject, likeProject } from '../services/projects';

function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const {
    project,
    createLocalComment,
    dislikeLocalProject,
    likeLocalProject,
    rootComments,
  } = useProject();

  console.log(project);

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

  return (
    <div className="wrapper">
      <div className="w-full flex flex-col">
        <h1>Project Details</h1>
        <div className="w-full h-96 bg-secondary rounded-md flex flex-col justify-between">
          <div className="h-full p-2">some explanations here</div>
          <div className="bg-primary h-max p-2">
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
