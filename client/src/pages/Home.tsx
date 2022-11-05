import ChallengeCard from '../components/ChallengeCard';
import { useUser } from '../contexts/authProvider';
import { useQuery } from 'react-query';
import { getActiveChallenges } from '../services/challenges';

function Home() {
  const { user } = useUser();

  const { isLoading, error, data } = useQuery(
    'allChallenges',
    getActiveChallenges
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data) return <div>No data</div>;

  console.log(data);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
    </div>
  );
}

export default Home;
