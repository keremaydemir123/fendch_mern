import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
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
      <div className="w-full md:w-1/2 p-4 bg-dark-purple rounded-md">
        <div className="flex items-center justify-between">
          <h5 className="text-muted">WEEK {challenge?.week}</h5>
          <LogoContainer tags={challenge?.tags as string[]} />
        </div>
        <h2>
          {challenge?.tech}: {challenge?.objective}
        </h2>
        <p>{challenge?.description}</p>

        <div className="w-full flex justify-end ">
          <CustomLink to={`/solutions/${challenge?._id}`}>
            See the Solution
          </CustomLink>
        </div>
      </div>
    </motion.div>
  );
}

export default SolutionCard;
