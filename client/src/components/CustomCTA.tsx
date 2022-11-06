// regular a tag that opens in a new tab

function CustomCTA({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className={`hover:border-2 hover:bg-primary border-2 border-secondary hover:border-light-gray px-2 py-1 rounded-md bg-dark text-light transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </a>
  );
}

export default CustomCTA;
