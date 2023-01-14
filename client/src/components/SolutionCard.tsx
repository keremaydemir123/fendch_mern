import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { FaFileCode } from 'react-icons/fa';
import CustomLink from './CustomLink';
import { ChallengeProps } from '../types';
import LogoContainer from './LogoContainer';

const solutionVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

function SolutionCard({ challenge }: { challenge: ChallengeProps }) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  let justify;
  if ((challenge?.week as number) % 2 === 1) {
    justify = 'items-end';
  } else {
    justify = 'items-start';
  }
  return (
    <motion.div
      ref={ref}
      variants={solutionVariants}
      initial="hidden"
      animate={control}
      className={`p-2 flex flex-col ${justify}`}
    >
      <div className="w-full md:w-1/2 p-4 bg-gradient-to-tr from-primary to-gray shadow-lg shadow-dark rounded-md">
        <div className="flex items-center justify-between">
          <h5 className="text-muted">WEEK {challenge?.week}</h5>
          <LogoContainer tags={challenge?.tags as string[]} />
        </div>
        <h2>
          {challenge?.tech}: {challenge?.objective}
        </h2>
        <p>{challenge?.description}</p>

        <div className="w-full flex justify-between items-center">
          <div className="flex gap-1 items-center bg-light bg-opacity-5 p-1 px-2 rounded-lg">
            <h3 className="text-silver">{challenge?.projects?.length}</h3>
            <FaFileCode className="text-xl text-light-purple" />
          </div>
          <CustomLink to={`/solutions/${challenge?._id}`}>
            See the Solution
          </CustomLink>
        </div>
      </div>
    </motion.div>
  );
}

export default SolutionCard;
