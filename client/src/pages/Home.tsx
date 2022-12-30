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
      <GradientTitle className="!to-light-gray !from-silver text-5xl">
        Learn frentend development by
      </GradientTitle>
      <GradientTitle className="text-4xl mb-4">
        <TypeAnimation
          sequence={[
            'Building Projects', // Deletes 'One' and types 'Two'
            1000, // Waits 2s
            "Checking Other's Code",
            1000, // Types 'Three' without deleting 'Two'
            'Getting Feedback',
            1000,
          ]}
          wrapper="div"
          cursor
          repeat={Infinity}
        />
      </GradientTitle>
      {activeChallenges.map((challenge: ChallengeProps) => (
        <ChallengeCard key={challenge?._id} challenge={challenge} />
      ))}
      <div className="flex gap-4">
        <Quote />
        <Quote />
        <Quote />
      </div>
      <div className="flex gap-2">
        <TopUsers />
        <TopProjects />
      </div>
    </div>
  );
}

export default Home;
