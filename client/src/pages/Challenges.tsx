import { useState } from 'react';
import { useQuery } from 'react-query';
import { MdViewList, MdViewStream, MdViewWeek } from 'react-icons/md';
import ChallengeCard from '../components/ChallengeCard';
import Loading from '../components/Loading';
import { getActiveChallenges, getOldChallenges } from '../services/challenges';
import { ChallengeProps } from '../types';
import ActiveChallengeBanner from '../components/ActiveChallengeBanner';

function Challenges() {
  const [layout, setLayout] = useState<'default' | 'list' | 'grid'>('default');

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

        <div className="my-4 p-2 flex items-center justify-center bg-dark-purple w-full h-12 rounded-md">
          <div className="flex items-center text-2xl gap-1">
            <MdViewStream
              onClick={() => setLayout('default')}
              className="bg-purple hover:bg-opacity-50 hover:text-light hover:cursor-pointer border-transparent rounded-md text-light-gray"
            />
            <MdViewList
              onClick={() => setLayout('list')}
              className="bg-purple hover:bg-opacity-50 hover:text-light hover:cursor-pointer border-transparent rounded-md text-light-gray"
            />
            <MdViewWeek
              onClick={() => setLayout('grid')}
              className="bg-purple hover:bg-opacity-50 hover:text-light hover:cursor-pointer  border-transparent rounded-md text-light-gray"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
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
