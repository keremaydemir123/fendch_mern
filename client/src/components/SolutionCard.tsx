import React from 'react';
import Button from './Button';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CustomLink from './CustomLink';

const solutionVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

function SolutionCard({ sideBorder }: { sideBorder: string }) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

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
      <div className="w-max p-4">
        <h3>WEEK 1</h3>
        <h1>Challenge Name: Challenge Objective</h1>
        <h2>Challenge Description</h2>
        <Button>Buy (4$)</Button>
        <CustomLink to="/solution">See the Solution</CustomLink>
      </div>
    </motion.div>
  );
}

export default SolutionCard;
