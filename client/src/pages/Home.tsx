import { useQuery } from 'react-query';
import ChallengeCard from '../components/ChallengeCard';
import { getActiveChallenges } from '../services/challenges';
import Loading from '../components/Loading';
import { ChallengeProps } from '../types';

function Home() {
  const {
    isLoading,
    error,
    data: activeChallenges,
  } = useQuery('activeChallenges', getActiveChallenges);

  if (isLoading) return <Loading />;
  if (error) return <div>Error...</div>;
  if (!activeChallenges) return <div>No active challenges</div>;

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {activeChallenges.map((challenge: ChallengeProps) => (
        <ChallengeCard key={challenge?._id} challenge={challenge} />
      ))}
    </div>
  );
}

export default Home;
