import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import CustomLink from './CustomLink';
import { ChallengeProps } from '../types';
import images from '../images';

const solutionVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

function SolutionCard({
  sideBorder,
  challenge,
}: {
  sideBorder: string;
  challenge: ChallengeProps;
}) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  console.log(images);

  let border;
  let justify;
  if (sideBorder === 'right') {
    border = 'border-r-2';
    justify = 'items-end';
  } else {
    border = 'border-l-2';
    justify = 'items-start';
  }
  return (
    <motion.div
      ref={ref}
      variants={solutionVariants}
      initial="hidden"
      animate={control}
      className={`${border} p-2 border-t-2 border-purple flex flex-col ${justify}`}
    >
      <div className="w-1/2 p-4 bg-secondary rounded-md">
        <div className="flex items-center justify-between">
          <h5 className="text-muted">WEEK {challenge?.week}</h5>
          <div className="flex gap-2">
            {challenge?.tags &&
              challenge?.tags.map((tag, index) => {
                return (
                  <img
                    src={images[tag.toLowerCase()]}
                    className="w-8 h-8"
                    alt={tag.toLowerCase()}
                    key={index}
                  />
                );
              })}
          </div>
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
