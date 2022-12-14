import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChallengeProps } from '../types/Challenge';
import dateFormatter from '../utils/dateFormatter';
import GradientTitle from './GradientTitle';
import LogoContainer from './LogoContainer';

function ChallengeCardDefault({ challenge }: { challenge: ChallengeProps }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark-purple rounded-lg p-6 shadow-md shadow-secondary min-w-[500px] w-[600px]"
    >
      <div className="flex justify-between items-center">
        <GradientTitle>{challenge?.tech}</GradientTitle>
        <h4 className="font-bold text-muted text-sm mr-3">
          WEEK {challenge?.week}
        </h4>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-light-purple font-medium text-lg">
          {challenge?.objective}
        </h2>
        <h6 className="text-muted font-light text-sm mr-3">
          {dateFormatter(new Date(challenge?.startDate as string))}
        </h6>
      </div>
      <p className="text-light font-light text-base mt-3">
        {challenge?.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <Link
          to={`/challenges/${challenge?._id}`}
          className="px-4 py-2 font-bold text-light bg-purple rounded-lg hover:bg-opacity-80 focus:outline-none focus:shadow-outline-purple"
        >
          See Details
        </Link>
        <LogoContainer tags={challenge?.tags as string[]} />
      </div>
    </motion.div>
  );
}

function ChallengeCardGrid({ challenge }: { challenge: ChallengeProps }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-between bg-dark-purple rounded-lg p-6 shadow-md shadow-secondary h-[320px] w-[250px]"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-muted text-sm mr-3">
          WEEK {challenge?.week}
        </h4>
        <h6 className="text-muted font-light text-sm mr-3">
          {dateFormatter(new Date(challenge?.startDate as string))}
        </h6>
      </div>
      <div className="flex flex-col h-36 mt-2">
        <GradientTitle>{challenge?.tech}</GradientTitle>
        <h2 className="text-light-purple font-medium text-lg italic">
          {challenge?.objective}
        </h2>
        <p className="text-light-purple font-light text-base mt-3">
          {challenge?.description}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <LogoContainer tags={challenge?.tags as string[]} className="w-full" />
        <div className="mt-2 w-full flex items-center justify-between">
          <Link
            to={`/challenges/${challenge?._id}`}
            className="px-4 w-full text-center py-2 font-bold text-light bg-purple rounded-lg hover:bg-opacity-80 focus:outline-none focus:shadow-outline-purple"
          >
            See Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ChallengeCardList({ challenge }: { challenge: ChallengeProps }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark-purple rounded-lg px-6 py-2 shadow-md shadow-secondary w-full"
    >
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-muted text-sm mr-3">
          WEEK {challenge?.week}
        </h4>
        <h6 className="text-muted font-light text-sm mr-3">
          {dateFormatter(new Date(challenge?.startDate as string))}
        </h6>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <GradientTitle>{challenge?.tech}</GradientTitle>
          <h2 className="text-light-purple font-medium text-lg ml-3">
            {challenge?.objective}
          </h2>
        </div>
        <LogoContainer tags={challenge?.tags as string[]} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-light font-light text-base">
          {challenge?.description}
        </p>
        <Link
          to={`/challenges/${challenge?._id}`}
          className=" w-max text-center py-1 font-bold text-light rounded-lg hover:bg-opacity-80 focus:outline-none focus:shadow-outline-purple"
        >
          See Details
        </Link>
      </div>
    </motion.div>
  );
}

function ChallengeCard({
  challenge,
  layout,
}: {
  challenge: ChallengeProps;
  layout?: 'default' | 'grid' | 'list';
}) {
  if (layout === 'grid') {
    return <ChallengeCardGrid challenge={challenge} />;
  }
  if (layout === 'list') {
    return <ChallengeCardList challenge={challenge} />;
  }

  return <ChallengeCardDefault challenge={challenge} />;
}

ChallengeCard.defaultProps = {
  layout: 'default',
};

export default ChallengeCard;
