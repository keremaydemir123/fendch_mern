import { ChallengeProps } from '../types';

export default function ActiveChallengeBanner({
  challenges,
}: {
  challenges: ChallengeProps[];
}) {
  return (
    <div className="relative p-4 w-full h-64 rounded-lg shadow-lg bg-gradient-to-r from-dark-purple to-purple overflow-hidden">
      <div className="flex justify-between items-center w-full h-full">
        <div className="flex flex-col justify-between w-2/5 h-full text-light-purple">
          <div>Upper</div>
          <div>{challenges[0]?.description}</div>
          <div>
            <h2>{challenges[0]?.objective}</h2>
            <h1>{challenges[0]?.tech}</h1>
          </div>
        </div>
        {/* Seperator */}
        <div
          className="w-1 h-[800px] overflow-hidden"
          style={{ transform: 'rotate(-45deg)' }}
        >
          <div className="border-r-8 border-light-purple opacity-20 w-full h-full">
            #
          </div>
        </div>
        <div className="flex flex-col items-end justify-between w-2/5 h-full text-light-purple">
          <div className="flex flex-col items-end">
            <h1>{challenges[1]?.tech}</h1>
            <h2>{challenges[1]?.objective}</h2>
          </div>
          <div>{challenges[1]?.description}</div>
          <div>bottom</div>
        </div>
      </div>
    </div>
  );
}
