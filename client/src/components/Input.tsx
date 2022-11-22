import { forwardRef } from 'react';

type InputProps = {
  label?: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
};

function Input(
  {
    label,
    type = 'text',
    placeholder,
    onChange,
    name,
    id,
    value,
    className,
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-light font-semibold font-lg">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        name={name}
        id={id}
        value={value}
        className={`p-2 border border-primary rounded-md text-primary outline-none ${className}`}
      />
    </div>
  );
}

export default forwardRef(Input);
