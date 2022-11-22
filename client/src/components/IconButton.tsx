function IconButton({
  Icon,
  isActive,
  color = 'text-blue-500',
  children,
  ...props
}: {
  Icon: any;
  isActive?: boolean;
  color?: string;
  children?: any;
  onClick?: () => void;
}) {
  return (
    <button
      className={`bg-none p-1 flex items-center text-lg ${
        isActive ? 'relative' : ''
      } ${color || ''}`}
      {...props}
    >
      <span className={`${children != null ? 'mr-1' : ''}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}

export default IconButton;
