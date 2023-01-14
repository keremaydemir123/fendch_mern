import { useQuery } from 'react-query';
import { TypeAnimation } from 'react-type-animation';
import ChallengeCard from '../components/ChallengeCard';
import { getActiveChallenges } from '../services/challenges';
import Loading from '../components/Loading';
import { ChallengeProps } from '../types';
import TopUsers from '../components/TopUsers';
import TopProjects from '../components/TopProjects';
import GradientTitle from '../components/GradientTitle';
import Quote from '../components/Quote';
import ChallengeParticle from '../components/ChallengeParticle';
import HeroAnimatedText from '../components/HeroAnimatedText';

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
    <div className="flex w-full flex-col justify-center items-center gap-4">
      <HeroAnimatedText />

      {activeChallenges.map((challenge: ChallengeProps) => (
        <ChallengeCard key={challenge?._id} challenge={challenge} />
      ))}
      <GradientTitle className="uppercase my-4 p-2 border-b-2 border-purple">
        Best way to learn frontend
      </GradientTitle>

      <div className="flex flex-wrap gap-6 w-full justify-center p-4">
        <Quote />
        <Quote />
        <Quote />
        <Quote />
      </div>
    </div>
  );
}

export default Home;
