import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChallengeProps } from '../types/Challenge';
import dateFormatter from '../utils/dateFormatter';
import GradientTitle from './GradientTitle';
import LogoContainer from './LogoContainer';
import ChallengeParticle from './ChallengeParticle';
import CustomLink from './CustomLink';

function ChallengeCardDefault({ challenge }: { challenge: ChallengeProps }) {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 10, stiffness: 200, duration: 3 }}
      className=" relative bg-gradient-to-br flex flex-col justify-between from-gray to-primary rounded-lg p-6 shadow-md shadow-secondary max-w-full w-[1000px] h-60"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full opacity-10">
        <ChallengeParticle />
      </div>
      <div className="flex justify-between items-center">
        <GradientTitle>{challenge?.tech}</GradientTitle>
        <h4 className="font-bold text-muted text-sm mr-3">
          WEEK {challenge?.week}
        </h4>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-light-purple font-medium text-2xl">
          {challenge?.objective}
        </h2>
        <h5 className="text-muted font-normal text-md mr-3">
          {dateFormatter(new Date(challenge?.startDate as string))}
        </h5>
      </div>
      <p className="text-light font-light text-base mt-3">
        {challenge?.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <Link
          to={`/challenges/${challenge?._id}`}
          className="px-4 py-2 font-bold text-light z-10 bg-purple rounded-lg hover:bg-dark-purple focus:outline-none focus:shadow-outline-purple"
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
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 110 }}
      className="flex flex-col justify-between bg-gradient-to-tr from-primary to-gray rounded-lg p-4 shadow-lg shadow-dark h-80 w-64"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-muted text-sm mr-3">
          WEEK {challenge?.week}
        </h4>
        <h5 className="text-muted font-light text-sm mr-3">
          {dateFormatter(new Date(challenge?.startDate as string))}
        </h5>
      </div>
      <div className="flex flex-col h-36 mt-2">
        <GradientTitle>{challenge?.tech}</GradientTitle>
        <h1 className="text-light text-lg font-bold">{challenge?.objective}</h1>
        <p className="text-light font-light text-base mt-3">
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
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="bg-gradient-to-tr from-primary to-gray rounded-lg px-6 py-2 shadow-md shadow-secondary w-full"
    >
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-muted text-sm">WEEK {challenge?.week}</h4>
        <h5 className="text-muted font-light text-sm">
          {dateFormatter(new Date(challenge?.startDate as string))}
        </h5>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex sm:flex-row flex-col">
          <GradientTitle>{challenge?.tech}</GradientTitle>
          <h2 className="md:ml-4">{challenge?.objective}</h2>
        </div>
        <LogoContainer tags={challenge?.tags as string[]} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-light font-light text-base line-clamp-3">
          {challenge?.description}
        </p>
        <CustomLink
          to={`/challenges/${challenge?._id}`}
          className="!w-40 text-center py-1 font-bold text-light rounded-lg hover:bg-opacity-80 focus:outline-none focus:shadow-outline-purple"
        >
          See Details
        </CustomLink>
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
