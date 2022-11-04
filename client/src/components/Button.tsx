/* eslint-disable react/button-has-type */

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  type: 'submit' | 'reset' | 'button' | undefined;
};

function Button({ onClick, children, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="hover:border-2 hover:bg-primary border-2 border-secondary hover:border-light-gray px-2 py-1 rounded-md bg-dark text-light transition-all duration-300 ease-in-out"
    >
      {children}
    </button>
  );
}

export default Button;
