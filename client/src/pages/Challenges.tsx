import { useState } from 'react';
import { useQuery } from 'react-query';
import { MdViewList, MdViewStream, MdViewWeek } from 'react-icons/md';
import ChallengeCard from '../components/ChallengeCard';
import Loading from '../components/Loading';
import { getActiveChallenges, getOldChallenges } from '../services/challenges';
import { ChallengeProps } from '../types';
import ActiveChallengeBanner from '../components/ActiveChallengeBanner';

function Challenges() {
  const [layout, setLayout] = useState<'list' | 'grid'>('grid');

  const { data: oldChallenges, isLoading: isLoadingOld } = useQuery(
    'oldChallenges',
    getOldChallenges
  );
  const { data: activeChallenges, isLoading: isLoadingActive } = useQuery(
    'activeChallenges',
    getActiveChallenges
  );

  if (isLoadingOld || isLoadingActive) return <Loading />;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-wrap justify-center items-center gap-4 w-5/6">
        <ActiveChallengeBanner challenges={activeChallenges} />

        <div className="my-4 p-2 px-4 flex items-center justify-end bg-dark-purple w-full h-full rounded-md">
          <div className="flex items-center text-4xl gap-2">
            <MdViewList
              onClick={() => setLayout('list')}
              className="bg-purple hover:bg-opacity-50 hover:text-light hover:cursor-pointer border-transparent rounded-md text-white"
            />
            <MdViewWeek
              onClick={() => setLayout('grid')}
              className="bg-purple hover:bg-opacity-50 hover:text-light hover:cursor-pointer border-transparent rounded-md text-white"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 w-full">
          {oldChallenges?.map((challenge: ChallengeProps) => (
            <ChallengeCard
              key={challenge?._id}
              challenge={challenge}
              layout={layout}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Challenges;
