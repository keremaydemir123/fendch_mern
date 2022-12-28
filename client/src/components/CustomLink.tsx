import React from 'react';
import { Link } from 'react-router-dom';

function CustomLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`px-2 py-1 text-md rounded-md bg-purple text-light duration-300 flex items-center justify-center gap-1 w-max shadow-sm shadow-dark ${className}`}
    >
      {children}
    </Link>
  );
}

CustomLink.defaultProps = {
  className: '',
};

export default CustomLink;
