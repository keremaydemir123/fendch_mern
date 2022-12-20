import { forwardRef } from 'react';

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, onChange, name, id, value, className }, ref) => {
    return (
      <>
        <label htmlFor={id} className="text-light font-semibold font-lg">
          {label}
        </label>
        <textarea
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          name={name}
          id={id}
          value={value}
          className={`p-2 border border-primary resize-none bg-primary text-light rounded-md outline-none ${className}`}
        />
      </>
    );
  }
);

TextArea.displayName = 'TextArea';

TextArea.defaultProps = {
  label: '',
  placeholder: '',
  onChange: () => {},
  name: '',
  id: '',
  value: '',
  className: '',
};

export default TextArea;
