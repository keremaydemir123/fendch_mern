import React from 'react';

function GradientTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const styles = `font-bold text-3xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple to-light-purple`;
  return <h1 className={`${styles} ${className}`}>{children}</h1>;
}

GradientTitle.defaultProps = {
  className: '',
};

export default GradientTitle;
