import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import { getProject } from '../services/projects';

function ProjectDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    error,
    data: project,
  } = useQuery(['project', id], () => getProject(id!));

  const createComment = async (message: string) => {
    try {
      const comment = await createComment(message);
    } catch (error) {}
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="wrapper">
      <div className="w-full flex flex-col">
        <h1>Project Details</h1>
        <div className="w-full h-96 bg-secondary rounded-md"></div>
        <h1>Comments</h1>
        <CommentForm onSubmit={createComment} />
      </div>
    </div>
  );
}

export default ProjectDetails;
