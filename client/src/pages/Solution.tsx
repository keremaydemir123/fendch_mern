import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import MarkdownTest from '../components/MarkdownTest';
import { getChallenge } from '../services/challenges';

function Solution() {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: challenge,
  } = useQuery('getSolutions', () => getChallenge(id));

  if (isLoading) return <Loading />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <div>
      <div className="bg-secondary rounded-md p-4">
        <h1>{challenge?.tech}</h1>
        <h2>{challenge?.objective}</h2>
        <img src={challenge?.thumbnail} alt="tumbnail" width={500} />
        <div className="p-2 bg-dark rounded-md">
          <MarkdownTest markdown={challenge?.solutionMd} />
        </div>
      </div>
    </div>
  );
}

export default Solution;
