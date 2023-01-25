import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import GradientTitle from '../components/GradientTitle';
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
    <div className="flex flex-col gap-4">
      <div className="bg-primary rounded-md p-4 shadow-lg shadow-dark">
        <GradientTitle>{challenge?.tech}</GradientTitle>
        <h2>{challenge?.objective}</h2>
      </div>
      <div className="bg-primary shadow-lg shadow-dark rounded-lg overflow-hidden p-4">
        <img src={challenge?.thumbnail} alt="tumbnail" width={500} />
        <div className="p-2 rounded-md">
          <MarkdownTest markdown={challenge?.solutionMd} />
        </div>
      </div>
    </div>
  );
}

export default Solution;
