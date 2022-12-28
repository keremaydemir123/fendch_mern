import React from 'react';
import { motion } from 'framer-motion';
import GradientTitle from './GradientTitle';

type TextButtonProps = {
  gradient?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

function TextButton({
  gradient,
  onClick,
  children,
  className,
}: TextButtonProps) {
  if (gradient)
    return <GradientTitle className={className}>{children}</GradientTitle>;
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      onClick={onClick}
      className={`bg-transparent ${className}`}
    >
      {children}
    </motion.button>
  );
}

TextButton.defaultProps = {
  className: '',
  gradient: false,
};

export default TextButton;
