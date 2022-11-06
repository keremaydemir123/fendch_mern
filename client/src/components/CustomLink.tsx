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
      className={`hover:border-2 hover:bg-primary border-2 border-secondary hover:border-light-gray px-2 py-1 rounded-md bg-dark text-light transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
