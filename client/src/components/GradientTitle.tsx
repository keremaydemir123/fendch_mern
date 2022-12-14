import React from 'react';

function GradientTitle({ children }: { children: React.ReactNode }) {
  const styles = `font-bold text-2xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-tahiti to-bermuda`;
  return <h1 className={styles}>{children}</h1>;
}

export default GradientTitle;
