import ChallengeCard from '../components/ChallengeCard';
import { useUser } from '../contexts/authProvider';
import { useQuery } from 'react-query';
import { getActiveChallenges } from '../services/challenges';
import Loading from '../components/Loading';

function Home() {
  const { user } = useUser();

  const {
    isLoading,
    error,
    data: activeChallenges,
  } = useQuery('activeChallenges', getActiveChallenges);

  if (isLoading) return <Loading />;
  if (error) return <div>Error...</div>;
  if (!activeChallenges) return <div>No active challenges</div>;

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
      {activeChallenges.map((challenge: any) => (
        <ChallengeCard key={challenge._id} challenge={challenge} />
      ))}
    </div>
  );
}

export default Home;
