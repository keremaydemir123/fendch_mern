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
      className={`px-2 py-1 text-md rounded-md bg-purple text-light duration-300 flex items-center justify-center gap-1 w-max shadow-sm shadow-dark ${className}`}
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

CustomCTA.defaultProps = {
  className: '',
};

export default CustomCTA;
