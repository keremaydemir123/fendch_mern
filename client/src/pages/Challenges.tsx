import { useState } from 'react';
import { useQuery } from 'react-query';
import { MdViewList, MdViewWeek } from 'react-icons/md';
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
      <div className="flex flex-wrap justify-center items-center gap-4 w-11/12">
        <ActiveChallengeBanner challenges={activeChallenges} />

        <div className="my-4 p-2 px-4 flex items-center justify-end bg-gradient-to-tr from-primary to-gray w-full h-full rounded-md shadow-lg shadow-dark ">
          <div className="flex items-center text-4xl gap-2">
            <MdViewList
              onClick={() => setLayout('list')}
              className={`${
                layout === 'list' ? 'text-light-purple' : 'text-muted'
              }  hover:opacity-50 hover:cursor-pointer border-transparent rounded-md text-white`}
            />
            <MdViewWeek
              onClick={() => setLayout('grid')}
              className={`${
                layout === 'grid' ? 'text-light-purple' : 'text-muted'
              }  hover:opacity-50 hover:cursor-pointer border-transparent rounded-md text-white`}
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
