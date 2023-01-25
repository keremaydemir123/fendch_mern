import { ChallengeProps } from '../types';
import CustomLink from './CustomLink';
import LogoContainer from './LogoContainer';
import ChallengeTimeLeft from './ChallengeTimeLeft';
import GradientTitle from './GradientTitle';

export default function ActiveChallengeBanner({
  challenges,
}: {
  challenges: ChallengeProps[];
}) {
  return (
    <div className="flex flex-col items-center rounded-lg shadow-lg shadow-dark md:bg-gradient-to-tr bg-gradient-to-b from-primary via-gray to-secondary overflow-hidden">
      <div className="flex md:flex-row flex-col items-center justify-between p-4 w-full  ">
        <div className="flex flex-col w-full h-64 text-light md:border-r-2 border-purple p-4">
          <div>
            <div>
              <h1 className="text-yellow text-3xl">{challenges[0]?.tech}</h1>
            </div>
            <h2 className="text-light font-medium mb-2">
              {challenges[0]?.objective}
            </h2>
          </div>

          <div>{challenges[0]?.description}</div>
          <div className="flex items-center justify-between mt-auto">
            <CustomLink
              to={`/challenges/${challenges[0]?._id}`}
              className="mt-auto !bg-purple !text-light font-semibold"
            >
              See Details
            </CustomLink>
            <LogoContainer
              tags={challenges[0]?.tags as string[]}
              className="w-max"
            />
          </div>
        </div>
        <div className="flex flex-col md:items-end items-start w-full h-64 text-light md:border-l-2 md:border-t-0 border-t-2 border-purple p-4">
          <div className="flex flex-col md:items-end items-start w-full">
            <div className="flex items-center w-full md:justify-end justify-start">
              <h1 className="text-3xl text-[#61DBFB] order-first md:order-last">
                {challenges[1]?.tech}
              </h1>
            </div>
            <h2 className="text-light font-medium mb-2 ">
              {challenges[1]?.objective}
            </h2>
          </div>

          <div>{challenges[1]?.description}</div>
          <div className="flex items-center justify-between mt-auto w-full">
            <LogoContainer
              tags={challenges[1]?.tags as string[]}
              className="w-max md:order-first order-last"
            />
            <CustomLink
              to={`/challenges/${challenges[1]?._id}`}
              className="mt-auto !bg-purple !text-light font-semibold"
            >
              See Details
            </CustomLink>
          </div>
        </div>
      </div>

      <ChallengeTimeLeft />
    </div>
  );
}
