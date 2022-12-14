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
      className={`hover:border-2 hover:bg-primary border-2 border-gray hover:border-light-gray px-2 py-1 rounded-md bg-dark text-light transition-all duration-300 ease-in-out ${className}`}
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
