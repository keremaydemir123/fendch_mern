import { useState } from 'react';
import { useQuery } from 'react-query';
import ChallengeCard from '../components/ChallengeCard';
import Loading from '../components/Loading';
import { getActiveChallenges, getOldChallenges } from '../services/challenges';

function Challenges() {
  const [queryString, setQueryString] = useState('');

  const { data: oldChallenges, isLoading: isLoadingOld } = useQuery(
    ['oldChallenges', queryString],
    getOldChallenges
  );
  const { data: activeChallenges, isLoading: isLoadingActive } = useQuery(
    'activeChallenges',
    getActiveChallenges
  );

  if (isLoadingOld || isLoadingActive) return <Loading />;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <input
        type="text"
        placeholder="Search"
        className="w-5/6 rounded-md outline-none border-none h-16 my-8 px-8 text-dark font-semibold text-3xl"
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
      />
      <div className="flex flex-wrap justify-center items-center gap-12 w-5/6">
        {activeChallenges?.map((challenge: any) => (
          <ChallengeCard
            key={challenge._id}
            challenge={challenge}
            isActive={challenge.isActive}
          />
        ))}
        {oldChallenges?.map((challenge: any) => (
          <ChallengeCard key={challenge._id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}

export default Challenges;
