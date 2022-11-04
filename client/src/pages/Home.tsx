import ChallengeCard from '../components/ChallengeCard';
import { useUser } from '../contexts/authProvider';

function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
    </div>
  );
}

export default Home;
