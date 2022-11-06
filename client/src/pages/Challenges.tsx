import { useQuery } from 'react-query';
import ChallengeCard from '../components/ChallengeCard';
import { getActiveChallenges, getOldChallenges } from '../services/challenges';

function Challenges() {
  const { data: oldChallenges, isLoading: isLoadingOld } = useQuery(
    'oldChallenges',
    getOldChallenges
  );
  const { data: activeChallenges, isLoading: isLoadingActive } = useQuery(
    'activeChallenges',
    getActiveChallenges
  );

  if (isLoadingOld || isLoadingActive) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <input
        type="text"
        placeholder="Search"
        className="w-5/6 rounded-md outline-none border-none h-16 my-8 px-8 text-dark font-semibold text-3xl"
      />
      <div className="flex flex-wrap justify-center items-center gap-12 w-5/6">
        {activeChallenges?.map((challenge: any) => (
          <ChallengeCard key={challenge._id} challenge={challenge} />
        ))}
        {oldChallenges?.map((challenge: any) => (
          <ChallengeCard key={challenge._id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}

export default Challenges;
