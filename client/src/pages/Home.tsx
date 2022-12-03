import { useQuery } from 'react-query';
import ChallengeCard from '../components/ChallengeCard';
import { useUser } from '../contexts/UserProvider';
import { getActiveChallenges } from '../services/challenges';
import Loading from '../components/Loading';
import { getUser } from '../services/auth';

function Home() {
  const { user, setUser } = useUser();

  const { data } = useQuery('getUser', getUser, {
    onSuccess: (data) => {
      setUser(data);
    },
  });

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
      {activeChallenges.map((challenge: any) => (
        <ChallengeCard key={challenge._id} challenge={challenge} />
      ))}
    </div>
  );
}

export default Home;
