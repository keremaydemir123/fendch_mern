import { forwardRef, useId } from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, placeholder, onChange, value, className }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-light font-semibold font-lg">
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          id={id}
          value={value}
          className={`p-2 border border-primary rounded-md text-light bg-gray outline-none ${className}`}
        />
      </div>
    );
  }
);

Input.defaultProps = {
  label: '',
  placeholder: '',
  onChange: () => {},
  value: '',
  className: '',
  type: 'text',
};

Input.displayName = 'Input';

export default Input;
