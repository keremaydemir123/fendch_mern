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
      className={`hover:border-light-purple px-2 py-1 text-md rounded-md bg-purple text-light duration-300 ${className}`}
    >
      {children}
    </Link>
  );
}

CustomLink.defaultProps = {
  className: '',
};

export default CustomLink;
