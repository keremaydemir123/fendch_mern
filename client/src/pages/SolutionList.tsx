import { useQuery } from 'react-query';
import Button from '../components/Button';
import SolutionCard from '../components/SolutionCard';
import { getOldChallenges } from '../services/challenges';
import { ChallengeProps } from '../types';

function Solutions() {
  const {
    isLoading,
    error,
    data: oldChallenges,
  } = useQuery('oldChallenges', getOldChallenges);

  return (
    <div className="mt-4">
      {oldChallenges?.map((challenge: ChallengeProps, index: number) => (
        <SolutionCard
          key={index}
          challenge={challenge}
          sideBorder={index % 2 == 1 ? 'right' : 'left'}
        />
      ))}
    </div>
  );
}

export default Solutions;
