/* eslint-disable react/button-has-type */

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  disabled?: boolean;
};

function Button({
  onClick,
  children,
  type = 'button',
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`hover:border-light-purple px-2 py-1 text-md rounded-md bg-gradient-to-tr from-dark-purple to-purple text-light duration-300 flex items-center justify-center gap-1 w-max ${className}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  className: '',
  disabled: false,
};

export default Button;
