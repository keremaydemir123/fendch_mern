import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import SolutionCard from '../components/SolutionCard';
import { getOldChallenges } from '../services/challenges';
import { ChallengeProps } from '../types';

function Solutions() {
  const {
    isLoading,
    error,
    data: oldChallenges,
  } = useQuery('oldChallenges', getOldChallenges);

  if (isLoading) return <Loading />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <div className="mt-4">
      {oldChallenges.length > 0 &&
        oldChallenges?.map((challenge: ChallengeProps) => (
          <SolutionCard challenge={challenge} key={challenge?._id} />
        ))}
    </div>
  );
}

export default Solutions;
