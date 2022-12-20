import { IconType } from 'react-icons/lib';

function IconButton({
  Icon,
  isActive,
  color,
  children,
  onClick,
}: {
  Icon: IconType;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={`bg-none p-1 flex items-center text-lg ${
        isActive ? 'relative' : ''
      } ${color || ''} hover:opacity-80 duration-100`}
      type="button"
      style={{ color }}
      onClick={onClick}
    >
      <span className={`${children != null ? 'mr-1' : ''}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}

IconButton.defaultProps = {
  isActive: false,
  color: '',
  children: null,
  onClick: () => {},
};

export default IconButton;
